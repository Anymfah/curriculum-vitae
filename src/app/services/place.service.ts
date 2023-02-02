import {Injectable} from '@angular/core';
import {DATA_PLACES} from '../constants/data-places.constant';
import {PlaceCollection} from '../models/place-collection.model';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  /** Place collection. */
  private _placeCollection: PlaceCollection = new PlaceCollection();

  /**
   * @constructor
   */
  public constructor() {
    this._initPlaceCollection();
  }

  /**
   * Initialize the place collection.
   */
  private _initPlaceCollection(): void {
    DATA_PLACES.forEach((place: {
      label: string;
      latitude: number;
      longitude: number;
      importance?: number;
      country?: string;
    }) => {
      this._placeCollection.add(place);
    });
  }

  /**
   * @method Get the place collection.
   */
  public getPlaceCollection(): PlaceCollection {
    return this._placeCollection;
  }
}
