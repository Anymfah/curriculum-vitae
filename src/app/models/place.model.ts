/**
 * Place model
 */
export class Place {

  /** ID of the place. */
  public id: number;

  /** Label of the place. */
  public label: string;

  /** Latitude of the place. */
  public latitude: number;

  /** Longitude of the place. */
  public longitude: number;

  /** Importance 0-100 of the place. */
  public importance: number;

  /** Label position of the place. */
  private labelPosition: 'top' | 'bottom' | 'right';

  /**
   * @constructor
   * @param id
   * @param label
   * @param latitude
   * @param longitude
   * @param importance
   * @param labelPosition
   */
  constructor(
    id: number,
    label: string,
    latitude: number,
    longitude: number,
    importance = 0,
    labelPosition: 'top' | 'bottom' | 'right' = 'bottom'
  ) {
    this.id = id;
    this.label = label;
    this.latitude = latitude;
    this.longitude = longitude;
    this.importance = importance;
    this.labelPosition = labelPosition;
  }

  /**
   * @method Search the place.
   */
  public search(search: string): boolean {
    return this.label.toLowerCase().includes(search.toLowerCase());
  }
}
