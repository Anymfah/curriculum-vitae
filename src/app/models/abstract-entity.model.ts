import {GenericData} from '../interfaces/data.interface';
import {OrderByInterface, QueryFilterInterface} from '../interfaces/query.interface';
import {EntityType} from '../types/entity.type';

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
   * Icon of the entity.
   */
  public icon?: string;

  /**
   * Entity color.
   */
  public color?: string;

  /**
   * @constructor
   * @param id Abstract Entity ID.
   * @param data Data to be used to populate the entity.
   */
  protected constructor(id: number, data: T) {
    this.id = id;
    this.name = data.title;
    this.color = data.color;
    this.icon = data.icon;
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
   * @method Filter the entity.
   */
  public abstract filterByField(filter: QueryFilterInterface): boolean;

  /**
   * @method Order the entity
   */
  public abstract orderByField(order: OrderByInterface, compareWith: EntityType): number;

  /**
   * @method Order the entity by native field
   */
  public orderByNativeField(order: OrderByInterface, compareWith: EntityType): number {
    const orderName = order.name as keyof EntityType;
    if (typeof compareWith[orderName] === 'string' && typeof this[orderName] === 'string') {
      return (compareWith[orderName] as string).localeCompare(this[orderName] as string);
    } else if (typeof compareWith[orderName] === 'number' && typeof this[orderName] === 'number') {
      return (compareWith[orderName] as number) - (this[orderName] as number);
    } else if (compareWith[orderName] instanceof Date && this[orderName] instanceof Date) {
      return (
        (compareWith[orderName] as unknown) as Date).getTime()
        - ((this[orderName] as unknown) as Date).getTime();
    }
    return 0;
  }
}
