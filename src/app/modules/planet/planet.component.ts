import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import Globe, {GlobeInstance} from 'globe.gl';
import {Feature, FeatureCollection, GeoJsonObject, GeoJsonProperties, Geometry} from 'geojson';
import {HttpClient} from '@angular/common/http';
import * as THREE from 'three';
import {PlaceService} from '../../services/place.service';
import {Place} from '../../models/place.model';

@Component({
  selector: 'cv-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements AfterViewInit, OnDestroy {

  /** Globe wrapper. */
  @ViewChild('globeWrapper') public globeWrapper!: ElementRef;

  /** Globe. (Generated only AfterViewInit) */
  public world!: GlobeInstance;

  /**
   * @constructor
   * @param _httpClient HTTP Client
   * @param _placeService Place Service
   */
  public constructor(
    private readonly _httpClient: HttpClient,
    private readonly _placeService: PlaceService
  ) {
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    this._createGlobe();
    this._setControlsConfig();
    this._addCountries();
    this._addPlaces();
    this._loadFont();
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
  }

  /**
   * Create the main globe.
   */
  private _createGlobe(): void {
    this.world = Globe()
      .backgroundColor('rgba(0, 0, 0, 0)')
      .showGlobe(true)
      .showAtmosphere(true)
      .atmosphereColor('#2c2346')
      .atmosphereAltitude(0.3)
      .globeMaterial(new THREE.MeshPhongMaterial({
        color: '#1a1428',
        emissive: '#020315',
        emissiveIntensity: 0.5,
        shininess: 0.1,
        specular: '#5423e3',
        transparent: false,
        opacity: 1
      }))
      .polygonStrokeColor(() => '#613dc3')
      (this.globeWrapper.nativeElement);
  }

  /**
   * Change the controls configuration.
   */
  _setControlsConfig(): void {
    // Bigger scroll zoom speed
    this.world.controls().zoomSpeed = 2;
    this.world.onZoom(() => {
      this.world.controls().zoomSpeed = 2;
    });

    // Max zoom
    this.world.controls().maxDistance = 600;
    // Min zoom
    this.world.controls().minDistance = 135;

    // Auto rotate
    this.world.controls().autoRotate = true;
    this.world.controls().autoRotateSpeed = 0.5;
  }

  /**
   * Add countries to the globe.
   */
  private _addCountries(): void {
    this._httpClient.get('assets/geo/110m_countries.geojson', {responseType: 'json'})
      .subscribe((content) => {
        if (content != null) {
          const countriesData: FeatureCollection<Geometry, GeoJsonProperties> = (content as unknown) as FeatureCollection<Geometry, GeoJsonProperties>;

          const countries = countriesData.features.filter(d => d.properties?.['ISO_A2'] !== 'AQ');
          this.world
            .polygonsData(countries)
            .polygonCapMaterial(country => {
              /**? country is a Feature<Geometry, GeoJsonProperties>
               * @see GeoJsonObject */
              const tCountry = country as Feature<Geometry, GeoJsonProperties>;
              const meshLambertMaterial = new THREE.MeshPhongMaterial({
                color: '#3e2d6f',
                emissive: '#4b348d',
                emissiveIntensity: 1,
                shininess: 5,
                specular: '#5016fa',
                transparent: true,
                blendDstAlpha: 1,
                opacity: 0.95
              });
              if (tCountry.properties == null) {
                return meshLambertMaterial;
              }

              if (tCountry.properties['BRK_NAME'] === 'France') {
                console.log('country', tCountry.properties['ADMIN'], 'is France')
                const color = new THREE.Color('#da0d4e');
                meshLambertMaterial.color = color;
                meshLambertMaterial.emissive = color;
                meshLambertMaterial.specular = color;
                meshLambertMaterial.shininess = 10;
              }
              return meshLambertMaterial;
            })
            .polygonAltitude(country => {
              const tCountry = country as Feature<Geometry, GeoJsonProperties>;
              if (tCountry.properties == null) {
                return 0.01;
              }
              if (tCountry.properties['BRK_NAME'] === 'France') {
                return 0.02;
              }
              return 0.01;
            })
            //.polygonSideColor(() => 'transparent')
            .polygonSideMaterial(() => new THREE.MeshPhongMaterial({
              color: '#3e2d6f',
              emissive: '#4b348d',
              emissiveIntensity: 0.2,
              shininess: 0.2,
              specular: '#5016fa',
              transparent: true,
              blendDstAlpha: 1,
              opacity: 0.95
            }))
        }
      });
  }

  /**
   * Add places to the globe.
   */
  private _addPlaces(): void {
    const collection: Place[] = this._placeService.getPlaceCollection().places;

    this.world
      .labelsData(collection)
      .labelLat('latitude')
      .labelLng('longitude')
      .labelText('label')
      .labelColor(() =>'rgba(255, 255, 255, 0.8)')
      .labelAltitude(place => (place as Place).importance * 0.0001 + 0.02)
      .labelSize(place => (place as Place).importance * 0.007)
      .labelDotRadius(place => (place as Place).importance * 0.01)
      .labelDotOrientation('labelPosition')
      .labelResolution(10)

  }

  /**
   * Load the font.
   */
  private _loadFont(): void {
    this._httpClient.get('assets/fonts/rajdhani/Rajdhani SemiBold_Regular.json', {responseType: 'json'})
      .subscribe((content) => {
        this.world.labelTypeFace(content);
      });
  }
}
