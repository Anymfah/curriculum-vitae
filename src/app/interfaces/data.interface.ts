import {SKILL_CATEGORY, SKILL_TITLE, WORK_CATEGORY} from "../enums/data.enum";

export interface GenericData {
  title: SKILL_TITLE | string;
  subtitle?: string;
  happiness?: number;
  color?: string;
  icon?: string;
}

export interface SkillDataInterface extends GenericData {
  level?: number;
  category: SKILL_CATEGORY[];
  experience?: number;
  favorite?: boolean;
}

export interface EducationDataInterface extends GenericData {
  startDate: string;
  endDate: string;
  location: string;
  school: string;
}

export interface WorkDataInterface extends GenericData {
  startDate: string;
  endDate: string;
  location: string;
  company: string;
  skills: SKILL_TITLE[];
  projects?: ProjectDataInterface[];
}

export interface ProjectDataInterface extends GenericData {
  startDate: string;
  endDate: string;
  skills: SKILL_TITLE[];
  category: WORK_CATEGORY[];
  favorite?: boolean;
}

export interface ProjectDataAlias {
  [key: string]: ProjectDataInterface;
}
