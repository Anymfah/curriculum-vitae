import {ProjectDataInterface} from '../interfaces/data.interface';
import {AbstractEntity} from './abstract-entity.model';
import {SkillEntity} from './skill-entity.model';
import {DATA_FIELD, WORK_CATEGORY} from '../enums/data.enum';
import {QueryInterface} from '../interfaces/query.interface';
import {compareValuesUtil} from '../utils/compare-values.util';


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
  public workCategory: WORK_CATEGORY[];

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
    this.workCategory = data.category;
    this.favorite = data.favorite ?? false;
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
      case DATA_FIELD.WORK_CATEGORY:
        if (typeof filter.value === 'string') {
          return compareValuesUtil(this.workCategory, filter.operator ?? '==', filter.value);
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
