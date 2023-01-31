import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'cv-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements AfterViewInit, OnDestroy {

  @ViewChild('canvas') public canvasRef!: ElementRef;

  @Input() public rotationSpeedX = 0.05;
  @Input() public rotationSpeedY = 0.01;
  @Input() public size = 200;
  //@Input() public texture = 'assets/images/planet/earth.jpg';

  //* Camera
  @Input() public cameraZ = 400;
  @Input() public fieldOfView = 1;
  @Input('nearClipping') public nearClippingPlane = 1;
  @Input('farClipping') public farClippingPlane = 1000;

  //? Helper Properties (Private Properties)
  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private loader = new THREE.TextureLoader();
  //private geometry = new THREE.SphereGeometry(this.size, 32, 32);
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  //private material = new THREE.MeshBasicMaterial({map: this.loader.load('assets/images/planet/earth.jpg')});
  private material = new THREE.MeshBasicMaterial({color: 0x00ff00});

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    this._createScene();
    this._startRenderingLoop();
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
  }

  /**
   * Creates the Scene and Camera.
   */
  private _createScene(): void {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(this.cube);

    //* Camera
    const aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  /**
   * Animates the Planet.
   */
  private _animatePlanet(): void {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Start the rendering loop.
   */
  private _startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    const component: PlanetComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component._animatePlanet();
      component.renderer.render(component.scene, component.camera);
    }());
  }
}
