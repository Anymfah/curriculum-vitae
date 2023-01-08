import {GenericData} from '../interfaces/data.interface';
import {QueryInterface} from '../interfaces/query.interface';

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
  protected constructor(id: number, data: T) {
    this.id = id;
    this.name = data.title;
    this.subtitle = data.subtitle ?? '';
    this.happiness = data.happiness ?? 0;
  }

  /**
   * @method search Search the entity.
   */
  public search(search: string): boolean {
    return this.name.toLowerCase().includes(search.toLowerCase());
  }

  /**
   * @method filter Filter the entity.
   */
  public abstract filterByField(filter: QueryInterface): boolean;
}
