import {WorkEntity} from '../models/work-entity.model';
import {ProjectEntity} from '../models/project-entity.model';
import {SkillEntity} from '../models/skill-entity.model';
import {EducationEntity} from '../models/education-entity.model';
import {
  EducationDataInterface,
  ProjectDataInterface,
  SkillDataInterface,
  WorkDataInterface
} from '../interfaces/data.interface';

export type DataType = SkillDataInterface | ProjectDataInterface | EducationDataInterface | WorkDataInterface;

export type CollectionDataType = SkillDataInterface[] | ProjectDataInterface[] | EducationDataInterface[] | WorkDataInterface[];

export type CollectionType = SkillEntity[] | ProjectEntity[] | EducationEntity[] | WorkEntity[];

export type EntityType = WorkEntity | ProjectEntity | SkillEntity | EducationEntity;
