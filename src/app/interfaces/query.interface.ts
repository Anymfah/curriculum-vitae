import {DATA_FIELD} from '../enums/data.enum';
import {OperatorType} from '../types/operators.type';
import {SkillEntity} from '../models/skill-entity.model';
import {ProjectEntity} from '../models/project-entity.model';


export interface QueryInterface {
  name: DATA_FIELD,
  operator?: OperatorType,
  value: string | number | boolean | Date | SkillEntity | ProjectEntity,
}
