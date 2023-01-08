import {AbstractEntity} from './abstract-entity.model';
import {SkillDataInterface} from '../interfaces/data.interface';
import {DATA_FIELD, SKILL_CATEGORY} from '../enums/data.enum';
import {QueryInterface} from '../interfaces/query.interface';
import {compareValuesUtil} from '../utils/compare-values.util';

export class SkillEntity extends AbstractEntity<SkillDataInterface> {



  /**
   * Skill entity level.
   */
  public level: number = 0;

  /**
   * Skill entity color.
   */
  public color: string;

  /**
   * Skill entity category.
   */
  public skillCategory: SKILL_CATEGORY[];

  /**
   * Skill entity experience.
   */
  public experience: number = 0;

  /**
   * Skill entity favorite.
   */
  public favorite: boolean = false;

  /**
   * @constructor
   * @param id Skill Entity ID.
   * @param data Data to be used to populate the entity.
   */
  public constructor(id: number, data: SkillDataInterface) {
    super(id, data);
    this.level = data.level ?? 0;
    this.color = data.color;
    this.skillCategory = data.category;
    this.experience = data.experience ?? 0;
    this.favorite = data.favorite ?? false;
  }

  /**
   * @method filterByField Filter the entity.
   * @param filter Filter to be applied.
   */
  public filterByField(filter: QueryInterface): boolean {
    switch (filter.name) {
      case DATA_FIELD.LEVEL:
        if (typeof filter.value === 'number') {
          return compareValuesUtil(this.level, filter.operator ?? '==', filter.value);
        }
        break;
      case DATA_FIELD.EXPERIENCE:
        if (typeof filter.value === 'number') {
          return compareValuesUtil(this.experience, filter.operator ?? '==', filter.value);
        }
        break;
      case DATA_FIELD.FAVORITE:
        if (typeof filter.value === 'boolean') {
          return compareValuesUtil(this.favorite, filter.operator ?? '==', filter.value);
        }
        break;
      case DATA_FIELD.SKILL_CATEGORY:
        if (typeof filter.value === 'string') {
          return compareValuesUtil(this.skillCategory, filter.operator ?? 'includes', filter.value);
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
