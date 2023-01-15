import {WorkDataInterface} from '../interfaces/data.interface';
import {AbstractEntity} from './abstract-entity.model';
import {ProjectEntity} from './project-entity.model';
import {SkillEntity} from './skill-entity.model';
import {OrderByInterface, QueryFilterInterface} from '../interfaces/query.interface';
import {DATA_FIELD} from '../enums/data.enum';
import {compareValuesUtil} from '../utils/compare-values.util';
import {EntityType} from '../types/entity.type';
import {ValueSkillEntityInterface} from '../interfaces/value-skill-entity.interface';


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
   * Get Skills ratios of the work entity.
   * Calculate the number of times each skill is used in the work entity
   * for each project and return the percentage ratio of each skill.
   * @see ValueSkillEntityInterface
   */
  public get skillRatios(): ValueSkillEntityInterface[] {
    const skills: {value: number, skill: SkillEntity}[] = [];
    this.projects.forEach((project: ProjectEntity) => {
      project.skills.forEach((skill: SkillEntity) => {
        const exists =
          skills.find((s: ValueSkillEntityInterface) => s.skill.id === skill.id);
        if (exists) {
          exists.value++;
        } else {
          skills.push({value: 1, skill});
        }
      });
    });

    const total = skills.reduce((acc: number, curr: ValueSkillEntityInterface) => {
      return acc + curr.value;
    }, 0);

    return skills.map((skill: ValueSkillEntityInterface) => {
      return {value: skill.value, skill: skill.skill};
    });
  }

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
  public filterByField(filter: QueryFilterInterface): boolean {
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

  /**
   * @method orderByField Order the entity.
   * @param order Order to be applied.
   * @param compareWith Entity to be compared with.
   */
  public orderByField(order: OrderByInterface, compareWith: EntityType): number {
    switch (order.name) {
    }
    return 0;
  }

}
