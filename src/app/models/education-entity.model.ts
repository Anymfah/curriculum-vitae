import {AbstractEntity} from './abstract-entity.model';
import {EducationDataInterface} from '../interfaces/data.interface';


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
}
