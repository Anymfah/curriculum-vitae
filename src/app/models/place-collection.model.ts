import {Place} from './place.model';


export class PlaceCollection {
  /** List of places. */
  public places: Place[];

  /** List of countries with places. */
  public countries: string[] = [];

  /**
   * @constructor
   */
  constructor() {
    this.places = [];
  }

  /**
   * @method Add a place to the collection.
   */
  public add(place: {
    label: string;
    latitude: number;
    longitude: number;
    importance?: number;
    country?: string;
    labelPosition?: 'top' | 'bottom' | 'right';
  }): void {
    this.places.push(
      new Place(
        this.places.length,
        place.label,
        place.latitude,
        place.longitude,
        place.importance,
        place.labelPosition ?? 'bottom'
      )
    );

    if (place.country && !this.countries.includes(place.country)) {
      this.countries.push(place.country);
    }
  }

  /**
   * @method Search the collection.
   */
  public search(search: string): Place[] {
    return this.places.filter((place: Place) => place.search(search));
  }
}
