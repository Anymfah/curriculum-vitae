import {AbstractEntity} from './abstract-entity.model';
import {SkillDataInterface} from '../interfaces/data.interface';
import {SKILL_CATEGORY} from '../enums/data.enum';

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
  public category: SKILL_CATEGORY[];

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
    this.category = data.category;
    this.experience = data.experience ?? 0;
    this.favorite = data.favorite ?? false;
  }
}
