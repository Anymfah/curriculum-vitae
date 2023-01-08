import {WorkDataInterface} from '../interfaces/data.interface';
import {AbstractEntity} from './abstract-entity.model';
import {SKILL_TITLE} from '../enums/data.enum';
import {ProjectEntity} from './project-entity.model';


export class WorkEntity extends AbstractEntity<WorkDataInterface> {

  /**
   * Work entity start date.
   */
  public startDate: Date;

  /**
   * Work entity end date.
   */
  public endDate: Date;

  /**
   * Work entity location.
   */
  public location: string;

  /**
   * Work entity company.
   */
  public company: string;

  /**
   * Work entity skills.
   */
  public skills: SKILL_TITLE[];

  /**
   * Work entity projects.
   */
  public projects: ProjectEntity[] = [];

  /**
   * @constructor
   * @param id Work Entity ID.
   * @param data Data to be used to populate the entity.
   */
  public constructor(id: number, data: WorkDataInterface) {
    super(id, data);
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
    this.location = data.location;
    this.company = data.company;
    this.skills = data.skills;
  }

}
