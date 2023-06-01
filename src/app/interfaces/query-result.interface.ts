import {DATA_TYPE} from '../enums/data.enum';
import {QueryInterface} from './query.interface';
import {EntityType} from '../types/entity.type';

/**
 * Query result interface
 */
export interface QueryResult {
  type: DATA_TYPE;
  query: QueryInterface;
  result: EntityType[];
}
