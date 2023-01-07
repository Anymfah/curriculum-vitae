import {SKILL_CATEGORY, SKILL_TITLE, WORK_CATEGORY} from "../enums/data.enum";

export interface SkillDataInterface {
  title: SKILL_TITLE;
  level?: number;
  color: string;
  category: SKILL_CATEGORY[];
  happiness?: number;
  experience?: number;
  favorite?: boolean;
}

export interface EducationDataInterface {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  location: string;
  school: string;
  happiness: number;
}

export interface WorkDataInterface {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  location: string;
  company: string;
  happiness: number;
  skills: SKILL_TITLE[];
  projects?: ProjectDataInterface[];
}

export interface ProjectDataInterface {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  happiness: number;
  skills: SKILL_TITLE[];
  category: WORK_CATEGORY[];
  favorite?: boolean;
}

export interface ProjectDataAlias {
  [key: string]: ProjectDataInterface;
}
