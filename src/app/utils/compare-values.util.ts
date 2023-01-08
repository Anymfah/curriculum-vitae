import {OperatorType} from '../types/operators.type';

/**
 * Compares two values with a given comparator.
 * @param value1 The first value to compare.
 * @param operator The comparator to use.
 * @param value2 The second value to compare.
 */
export function compareValuesUtil(
  value1: number | string | Date | boolean | string[] | number[],
  operator: OperatorType,
  value2: number | string | Date | boolean
) {
  switch (operator) {
    case '==':
      return value1 === value2;
    case '!=':
      return value1 !== value2;
    case '>':
      return value1 > value2;
    case '<':
      return value1 < value2;
    case '>=':
      return value1 >= value2;
    case '<=':
      return value1 <= value2;
    case 'in':
      const value2Unknown = value2 as unknown;
      const value2Array = value2Unknown as Array<number | string | Date | boolean>;
      return value2Array.includes(value1 as string);
    case 'includes':
      const value1Unknown = value1 as unknown;
      const value1Array = value1Unknown as Array<number | string | Date | boolean>;
      return value1Array.includes(value2 as string);
    default:
      return false;
  }
}
