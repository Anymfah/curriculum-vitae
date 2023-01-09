import {EntityType} from '../types/entity.type';
import {OrderByInterface, QueryFilterInterface, QueryInterface} from '../interfaces/query.interface';

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
  private readonly _limitNum?: number;

  /**
   * Order By Field
   */
  private readonly _orderBy?: OrderByInterface[];

  /**
   * Search in collection
   */
  private readonly _searchStr?: string;

  /**
   * Arguments to apply to the query
   */
  private readonly _filters?: QueryFilterInterface[];

  /**
   * @constructor
   * @param collection Collection to work on
   * @param args Arguments to apply to the query
   */
  public constructor(collection: EntityType[], args: QueryInterface) {
    this._collectionOrigin = collection;
    this._collection = collection;

    this._limitNum = args.limit;
    this._filters = args.filters;
    this._orderBy = args.orderBy;
    this._searchStr = args.search;

    this._init();
  }

  private _init(): void {
    /**
     * Start with filter if fields are provided
     */
    if (this._filters != null && this._filters.length > 0) {
      this._collection = this._filterCollection(this._collection, this._filters);
    }

    /**
     * Order by if fields are provided
     */
    if (this._orderBy != null && this._orderBy.length > 0) {
      this._collection = this._orderByCollection(this._collection, this._orderBy);
    }

    /**
     * Search if search string is provided
     */
    if (this._searchStr != null && this._searchStr.length > 0) {
      this._collection = this._search(this._collection, this._searchStr);
    }

    /**
     * Limit if limit is provided
     */
    if (this._limitNum != null && this._limitNum > 0) {
      this._collection = this._limit(this._collection, this._limitNum);
    }

  }

  /**
   * Filter Collection
   * @param collection Collection to filter
   * @param fields Fields to filter by
   */
  private _filterCollection(collection: EntityType[], fields: QueryFilterInterface[]): EntityType[] {
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
   * Order collection by
   * @param collection Collection to order
   * @param fields Fields to order by
   */
  private _orderByCollection(collection: EntityType[], fields: OrderByInterface[]): EntityType[] {
    fields.forEach((field: OrderByInterface) => {

      if (collection[0]?.hasOwnProperty(field.name)) {
        collection = collection.sort((a: EntityType, b: EntityType) => {
          return a.orderByNativeField(field, b);
        });
      }
    });
    return collection;
  }

  /**
   * Search in collection
   * @param collection Collection to search in
   * @param search Search string
   */
  private _search(collection: EntityType[], search: string): EntityType[]{
    return collection.filter((entity: EntityType) => {
      return entity.search(search);
    });
  }

  /**
   * Limit entities to
   * @param collection
   * @param limit Number of entities to limit to
   */
  private _limit(collection: EntityType[], limit: number): EntityType[] {
    return collection.slice(0, limit);
  }

  /**
   * Get Collection
   */
  public getCollection(): EntityType[] {
    return this._collection;
  }
}
