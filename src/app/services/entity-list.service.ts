import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SkillEntity} from '../models/skill-entity.model';
import {ProjectEntity} from '../models/project-entity.model';
import {EntityType} from '../types/entity.type';
import {EducationEntity} from '../models/education-entity.model';
import {WorkEntity} from '../models/work-entity.model';
import {DATA_SKILLS} from '../constants/data-skills.constant';
import {DATA_EDUCATION} from '../constants/data-education.constant';
import {
  EducationDataInterface,
  ProjectDataInterface,
  SkillDataInterface,
  WorkDataInterface
} from '../interfaces/data.interface';
import {DATA_WORK} from '../constants/data-work.constant';
import {DATA_TYPE, ORDER_DIRECTION, ORDER_FIELD} from '../enums/data.enum';
import {QueryInterface} from '../interfaces/query.interface';
import {EntityQueryModel} from '../models/entity-query.model';

@Injectable({
  providedIn: 'root'
})
export class EntityListService {

  /**
   * ID of the last created entity.
   */
  private _id = 0;

  /**
   * Entity collection as a behavior subject.
   */
  private _entityCollection: BehaviorSubject<EntityType[]> = new BehaviorSubject<EntityType[]>([]);

  /**
   * Entity collection as an observable.
   */
  public entityCollection$ = this._entityCollection.asObservable();

  /**
   * Skills entity collection as BehaviorSubject.
   */
  private _skills = new BehaviorSubject<SkillEntity[]>([]);

  /**
   * Skills entity collection as observable.
   */
  public skills$ = this._skills.asObservable();

  /**
   * Projects entity collection as BehaviorSubject.
   */
  private _projects = new BehaviorSubject<ProjectEntity[]>([]);

  /**
   * Education entity collection as BehaviorSubject.
   */
  private _education = new BehaviorSubject<EducationEntity[]>([]);

  /**
   * Education entity collection as observable.
   */
  public education$ = this._education.asObservable();

  /**
   * Work entity collection as BehaviorSubject.
   */
  private _work = new BehaviorSubject<WorkEntity[]>([]);

  /**
   * Work entity collection as observable.
   */
  public work$ = this._work.asObservable();

  /**
   * Get projects as observable.
   */
  public projects$ = this._projects.asObservable();

  /**
   * @constructor
   */
  public constructor() {
    const skillsCollection = this._getSkillCollection(DATA_SKILLS);
    this._skills.next(skillsCollection);

    const educationCollection = this._getEducationCollection(DATA_EDUCATION);
    this._education.next(educationCollection);

    const workCollection = this._getWorkCollection(DATA_WORK);
    this._work.next(workCollection);

    this._entityCollection.next([
      ...skillsCollection,
      ...educationCollection,
      ...workCollection,
      ...this._projects.value
    ]);

    /*console.log(this.getFilteredCollection(
      DATA_TYPE.SKILL,
      [{
        name: DATA_FIELD.HAPPINESS,
        operator: '>',
        value: 99
      }, {
        name: DATA_FIELD.FAVORITE,
        operator: '==',
        value: true
      }, {
        name: DATA_FIELD.SKILL_CATEGORY,
        operator: 'includes',
        value: SKILL_CATEGORY.FRONT_END
      }
      ]
    ))*/
    console.log(this);
    console.log(this.getFilteredCollection(
      DATA_TYPE.PROJECT, {
        orderBy: [
          {
            name: ORDER_FIELD.START_DATE,
            direction: ORDER_DIRECTION.ASC,
          }
        ]
      } as QueryInterface
    ))
  }

  /**
   * Get the skill collection.
   * @param data Data to be used to populate the collection.
   */
  private _getSkillCollection(data: SkillDataInterface[]): SkillEntity[] {
    const skills: SkillEntity[] = [];
    data.forEach((skill) => {
      skills.push(new SkillEntity(this._id, skill));
      this._id++;
    });
    return skills;
  }

  /**
   * Get the education collection.
   * @param data Data to be used to populate the collection.
   */
  private _getEducationCollection(data: EducationDataInterface[]): EducationEntity[] {
    const education: EducationEntity[] = [];
    data.forEach((educationItem) => {
      education.push(new EducationEntity(this._id, educationItem));
      this._id++;
    });
    return education;
  }

  /**
   * Get the work collection.
   * @param data Data to be used to populate the collection.
   */
  private _getWorkCollection(data: WorkDataInterface[]): WorkEntity[] {
    const work: WorkEntity[] = [];
    data.forEach((workItem) => {
      const workEntity = new WorkEntity(this._id, workItem);
      if (workItem.projects != null) {
        // Fill the project entities.
        workEntity.projects = this._getProjectCollection(workItem.projects);
        this._projects.next([...this._projects.value, ...workEntity.projects]);
      }
      if (workItem.skills != null) {
        // Fill the skill entities.
        workEntity.skills = [];
        workItem.skills.forEach((skill) => {
          this._skills.value.forEach((skillEntity) => {
            if (skillEntity.name === skill) {
              workEntity.skills.push(skillEntity);
            }
          });
        });
      }
      work.push(workEntity);
      this._id++;
    });
    return work;
  }

  /**
   * Get the project collection.
   * @param data Data to be used to populate the collection.
   * TODO: Missing projects, get from personal work or hobby...
   */
  private _getProjectCollection(data: ProjectDataInterface[]): ProjectEntity[] {
    const projects: ProjectEntity[] = [];
    data.forEach((project) => {
      const projectEntity = new ProjectEntity(this._id, project);

      // Insert the skill entities into the project entity collection.
      if (project.skills != null) {
        const skills: SkillEntity[] = [];
        project.skills.forEach((skill) => {
          this._skills.value.forEach((skillEntity) => {
            if (skillEntity.name === skill) {
              skills.push(skillEntity);
            }
          });
        });
        projectEntity.skills = skills;
      }
      projects.push(projectEntity);
      this._id++;
    });
    return projects;
  }

  /**
   * @method Get collection by type.
   * @param type Type of collection to get.
   */
  public getCollectionByType(type: DATA_TYPE): EntityType[] {
    switch (type) {
      case DATA_TYPE.SKILL:
        return this._skills.value;
      case DATA_TYPE.EDUCATION:
        return this._education.value;
      case DATA_TYPE.WORK:
        return this._work.value;
      case DATA_TYPE.PROJECT:
        return this._projects.value;
      default:
        return [];
    }
  }

  /**
   * @method Get Filtered Collection
   * @param type Type of collection to get.
   * @param args Filters/Ordering to apply to the collection.
   */
  public getFilteredCollection(
    type: DATA_TYPE,
    args?: QueryInterface): EntityType[] {
    let collection = this.getCollectionByType(type);
    if (args != null) {
      const query = new EntityQueryModel(collection, args);
      collection = query.getCollection();
    }

    return collection;
  }
}
