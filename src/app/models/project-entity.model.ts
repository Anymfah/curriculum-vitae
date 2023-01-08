import {ProjectDataInterface} from '../interfaces/data.interface';
import {AbstractEntity} from './abstract-entity.model';
import {SkillEntity} from './skill-entity.model';
import {WORK_CATEGORY} from '../enums/data.enum';


export class ProjectEntity extends AbstractEntity<ProjectDataInterface> {
  /**
   * Project entity start date.
   */
  public startDate: Date;

  /**
   * Project entity end date.
   */
  public endDate: Date;

  /**
   * Skills used in the project.
   */
  public skills: SkillEntity[] = [];

  /**
   * Category of the project.
   */
  public category: WORK_CATEGORY[];

  /**
   * Project entity favorite.
   */
  favorite: boolean;

  /**
   * @constructor
   * @param id Project Entity ID.
   * @param data Data to be used to populate the entity.
   */
  public constructor(
    id: number,
    data: ProjectDataInterface
  ) {
    super(id, data);
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
    this.category = data.category;
    this.favorite = data.favorite ?? false;
  }
}
