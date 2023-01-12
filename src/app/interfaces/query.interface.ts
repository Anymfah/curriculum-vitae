import {DATA_FIELD, ORDER_DIRECTION, ORDER_FIELD} from '../enums/data.enum';
import {OperatorType} from '../types/operators.type';
import {SkillEntity} from '../models/skill-entity.model';
import {ProjectEntity} from '../models/project-entity.model';


/**
 * @interface QueryFilterInterface
 * @description Query interface for filtering entities.
 */
export interface QueryFilterInterface {
  /**
   * Name of the field to be filtered.
   */
  name: DATA_FIELD,

  /**
   * Operator to be used to filter the field.
   */
  operator?: OperatorType,

  /**
   * Condition to be used to filter the field.
   * Default is 'AND'.
   */
  condition?: 'AND' | 'OR',

  /**
   * Value to be used to filter the field.
   */
  value: string | number | boolean | Date | SkillEntity | ProjectEntity,
}

/**
 * @interface OrderByInterface
 * @description Interface to be used to order the data.
 */
export interface OrderByInterface {
  /**
   * Name of the field to be ordered.
   */
  name: ORDER_FIELD,
  /**
   * Order to be used to order the field.
   */
  direction?: ORDER_DIRECTION,
}


/**
 * @interface QueryInterface
 * @description Query interface for
 *  filtering
 *  ordering
 *  limit
 *  offset
 *  or search entities.
 */
export interface QueryInterface {
  /**
   * Filters to be applied to the data.
   */
  filters?: QueryFilterInterface[],

  /**
   * Order to be applied to the data.
   */
  orderBy?: OrderByInterface[],

  /**
   * Limit to be applied to the data.
   */
  limit?: number,

  /**
   * Offset to be applied to the data.
   */
  offset?: number,

  /**
   * Search to be applied to the data.
   */
  search?: string,

}
