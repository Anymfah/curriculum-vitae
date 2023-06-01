import {QueryResult} from '../interfaces/query-result.interface';
import {QueryInterface} from '../interfaces/query.interface';
import {DATA_TYPE} from '../enums/data.enum';
import {EntityType} from '../types/entity.type';


export class CachedQueries {

  /**
   * Query result collection.
   */
  private _queryResultCollection: QueryResult[] = [];

  /**
   * @constructor
   */
  public constructor() {
  }

  /**
   * Get Query result from cache.
   * @param type
   * @param query Query to get result for.
   * @returns Query result.
   */
  public get(type: DATA_TYPE, query: QueryInterface): QueryResult | undefined {
    return this._queryResultCollection.find(
      (queryResult) => {
        return queryResult.query === query && queryResult.type === type;
      });
  }

  /**
   * Add query result to cache.
   */
  public add(type: DATA_TYPE, query: QueryInterface, result: EntityType[]): void {
    this.purge();
    this._queryResultCollection.push({type, query, result});
  }

  /**
   * Purge first 25 queries cache when 50 queries are cached.
   */
  public purge(): void {
    if (this._queryResultCollection.length >= 50) {
      this._queryResultCollection = this._queryResultCollection.slice(25);
    }
  }
}
