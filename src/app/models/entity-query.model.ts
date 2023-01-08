import {EntityType} from '../types/entity.type';
import {DATA_FIELD, ORDER_BY} from '../enums/data.enum';
import {QueryInterface} from '../interfaces/query.interface';

export class EntityQueryModel<T = EntityType> {

  /**
   * Collection origin
   */
  private readonly _collectionOrigin: EntityType[] = [];

  /**
   * Collection to work on
   */
  private _collection: EntityType[] = [];

  /**
   * Limit entities to a certain number - 0 for all
   */
  private _limit: number = 0;

  /**
   * Order By Field
   */
  private _orderByField?: DATA_FIELD;

  /**
   * Direction to order entities by
   */
  private _orderByDirection?: ORDER_BY;

  /**
   * Arguments to apply to the query
   */
  private readonly _fields: QueryInterface[] = [];

  /**
   * @constructor
   */
  public constructor(collection: EntityType[], args: {
    fields?: QueryInterface[],
    orderBy?: {
      field: DATA_FIELD,
      direction: ORDER_BY,
    },
    limit?: number,
  }) {
    this._collectionOrigin = collection;
    this._collection = collection;

    this._limit = args.limit ?? 0;
    this._fields = args.fields ?? [];

    this._init();
  }

  private _init(): void {
    /**
     * Start with filter if fields are provided
     */
    if (this._fields.length > 0) {
      this._collection = this._filterCollection(this._collection, this._fields);
    }
  }

  /**
   * Filter Collection
   * @param collection Collection to filter
   * @param fields Fields to filter by
   */
  private _filterCollection(collection: EntityType[], fields: QueryInterface[]): EntityType[] {
    fields.forEach((field) => {
      if (collection[0]?.hasOwnProperty(field.name)) {
        collection = collection.filter((entity: EntityType) => {
          return entity.filterByField(field);
        });
      }
    });
    return collection;
  }

  /**
   * Order entities by
   * @param field
   * @param direction
   */
  public orderBy(field: string, direction: string): EntityQueryModel {
    return this;
  }

  /**
   * Limit entities to
   * @param limit Number of entities to limit to
   */
  public limit(limit: number): EntityQueryModel {
    return this;
  }

  /**
   * Get Collection
   */
  public getCollection(): EntityType[] {
    return this._collection;
  }
}
