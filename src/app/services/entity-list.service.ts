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
import {DATA_TYPE} from '../enums/data.enum';
import {QueryInterface} from '../interfaces/query.interface';
import {EntityQueryModel} from '../models/entity-query.model';
import {PRE_MADE_QUERY} from '../enums/premade-query.enum';
import {PRE_MADE_QUERY_CONSTANT} from '../constants/premade-query.constant';

@Injectable({
  providedIn: 'root'
})
export class EntityListService {

  /**
   * ID of the last created entity.
   */
  private _id = 0;

  /**
   * Focus on a specific entity.
   */
  private _focused = new BehaviorSubject<EntityType | undefined>(undefined);

  /**
   * Focus on a specific entity as Observable.
   */
  public focused$ = this._focused.asObservable();

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

  /** Skills collection direct access. */
  public get skills(): SkillEntity[] {
    return this._skills.value;
  }

  /**
   * Projects entity collection as BehaviorSubject.
   */
  private _projects = new BehaviorSubject<ProjectEntity[]>([]);

  /**
   * Get projects as observable.
   */
  public projects$ = this._projects.asObservable();

  /** Projects collection direct access. */
  public get projects(): ProjectEntity[] {
    return this._projects.value;
  }


  /**
   * Education entity collection as BehaviorSubject.
   */
  private _education = new BehaviorSubject<EducationEntity[]>([]);

  /**
   * Education entity collection as observable.
   */
  public education$ = this._education.asObservable();

  /** Education collection direct access. */
  public get education(): EducationEntity[] {
    return this._education.value;
  }

  /**
   * Work entity collection as BehaviorSubject.
   */
  private _work = new BehaviorSubject<WorkEntity[]>([]);

  /**
   * Work entity collection as observable.
   */
  public work$ = this._work.asObservable();

  /** Work collection direct access. */
  public get work(): WorkEntity[] {
    return this._work.value;
  }

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

    console.log(this)
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
      this._id++;
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

  /**
   * Get PreMade Query.
   * @param type Type of collection to get.
   * @param preMadeQuery PreMade query to apply to the collection.
   */
  public getPreMadeQuery(type: DATA_TYPE, preMadeQuery: PRE_MADE_QUERY): EntityType[] {
    return this.getFilteredCollection(type, PRE_MADE_QUERY_CONSTANT[preMadeQuery]);
  }

  /**
   * Focus on a specific entity.
   */
  public focusEntity(entity: number | EntityType | undefined): void {
    if (typeof entity === 'number') {
      this._focused.next(this.getEntityById(entity));
    } else {
      this._focused.next(entity);
    }
    console.log(this._focused.value);
  }

  /**
   * @method Get Entity by ID.
   * @param id
   */
  public getEntityById(id: number): EntityType | undefined {
    return this._entityCollection.value.find((entity) => entity.id === id);
  }
}
