import {SKILL_CATEGORY, SKILL_TITLE, WORK_CATEGORY} from "../enums/data.enum";

export interface GenericData {
  title: SKILL_TITLE | string;
  subtitle?: string;
  happiness?: number;
}

export interface SkillDataInterface extends GenericData {
  level?: number;
  color: string;
  category: SKILL_CATEGORY[];
  experience?: number;
  favorite?: boolean;
  icon?: string;
}

export interface EducationDataInterface extends GenericData {
  startDate: string;
  endDate: string;
  location: string;
  school: string;
  icon?: string;
}

export interface WorkDataInterface extends GenericData {
  startDate: string;
  endDate: string;
  location: string;
  company: string;
  skills: SKILL_TITLE[];
  projects?: ProjectDataInterface[];
  icon?: string;
}

export interface ProjectDataInterface extends GenericData {
  startDate: string;
  endDate: string;
  skills: SKILL_TITLE[];
  category: WORK_CATEGORY[];
  favorite?: boolean;
  icon?: string;
}

export interface ProjectDataAlias {
  [key: string]: ProjectDataInterface;
}
