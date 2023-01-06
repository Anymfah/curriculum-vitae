import {SKILL_CATEGORY, SKILL_TITLE} from "../enums/data.enum";

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
}

export interface ProjectDataInterface {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  happiness: number;
  skills: SKILL_TITLE[];
}

export interface ProjectDataAlias {
  [key: string]: ProjectDataInterface;
}
