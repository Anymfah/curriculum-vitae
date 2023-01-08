import {AbstractEntity} from './abstract-entity.model';
import {EducationDataInterface} from '../interfaces/data.interface';
import {QueryInterface} from '../interfaces/query.interface';
import {DATA_FIELD} from '../enums/data.enum';
import {compareValuesUtil} from '../utils/compare-values.util';


export class EducationEntity extends AbstractEntity<EducationDataInterface> {

  /**
   * Education entity start date.
   */
  public startDate: Date;

  /**
   * Education entity end date.
   */
  public endDate: Date;

  /**
   * Education entity location.
   */
  public location: string;

  /**
   * Education entity school.
   */
  public school: string;

  /**
   * @constructor
   * @param id Education Entity ID.
   * @param data Data to be used to populate the entity.
   */
  public constructor(id: number, data: EducationDataInterface) {
    super(id, data);
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
    this.location = data.location;
    this.school = data.school;
  }

  /**
   * @method filterByField Filter the entity.
   * @param filter Filter to be applied.
   */
  public filterByField(filter: QueryInterface): boolean {
    switch (filter.name) {
      case DATA_FIELD.START_DATE:
        if (typeof filter.value === 'string' || filter.value instanceof Date) {
          const date = typeof filter.value === 'string' ? new Date(filter.value) : filter.value;
          return compareValuesUtil(this.startDate, filter.operator ?? '==', date);
        }
        break;
      case DATA_FIELD.END_DATE:
        if (typeof filter.value === 'string' || filter.value instanceof Date) {
          const date = typeof filter.value === 'string' ? new Date(filter.value) : filter.value;
          return compareValuesUtil(this.endDate, filter.operator ?? '==', date);
        }
        break;
      case DATA_FIELD.HAPPINESS:
        if (typeof filter.value === 'number') {
          return compareValuesUtil(this.happiness, filter.operator ?? '==', filter.value);
        }
    }
    return false;
  }
}
