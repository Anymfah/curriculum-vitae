import {WorkDataInterface} from '../interfaces/data.interface';
import {AbstractEntity} from './abstract-entity.model';
import {ProjectEntity} from './project-entity.model';
import {SkillEntity} from './skill-entity.model';
import {QueryInterface} from '../interfaces/query.interface';
import {DATA_FIELD} from '../enums/data.enum';
import {compareValuesUtil} from '../utils/compare-values.util';


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
  public skills: SkillEntity[] = [];

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
      case DATA_FIELD.SKILL_ENTITY:
        if (filter.value instanceof SkillEntity) {
          const skills: number[] = this.skills.map((skill: SkillEntity) => skill.id);
          const value: number = filter.value.id;
          return compareValuesUtil(skills, filter.operator ?? '==', value);
        }
        break;

      case DATA_FIELD.PROJECT_ENTITY:
        if (filter.value instanceof ProjectEntity) {
          const projects: number[] = this.projects.map((project: ProjectEntity) => project.id);
          const value: number = filter.value.id;
          return compareValuesUtil(projects, filter.operator ?? '==', value);
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
