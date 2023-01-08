import {GenericData} from '../interfaces/data.interface';

/**
 * Entity model
 */
export abstract class AbstractEntity<T extends GenericData> {

  /**
   * Abstract Entity ID.
   */
  public id: number;

  /**
   * Name of the entity.
   */
  public name: string;

  /**
   * Subtitle of the entity.
   */
  public subtitle: string;

  /**
   * Happiness of the entity.
   */
  public happiness: number;

  /**
   * @constructor
   * @param id Abstract Entity ID.
   * @param data Data to be used to populate the entity.
   */
  public constructor(id: number, data: T) {
    this.id = id;
    this.name = data.title;
    this.subtitle = data.subtitle ?? '';
    this.happiness = data.happiness ?? 0;
  }
}
