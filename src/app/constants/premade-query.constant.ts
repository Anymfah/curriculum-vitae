import {DATA_FIELD, ORDER_FIELD, SKILL_CATEGORY} from '../enums/data.enum';
import {QueryInterface} from '../interfaces/query.interface';
import {PRE_MADE_QUERY} from '../enums/premade-query.enum';


export const PRE_MADE_QUERY_CONSTANT = {
  /**
   * Best skills favorite.
   * Happiness 100
   * Order by happiness ASC
   */
  [PRE_MADE_QUERY.STACKS_BEST_FAVORITES]: {
    limit: 5,
    filters: [
      {name: DATA_FIELD.FAVORITE, value: true},
      {name: DATA_FIELD.HAPPINESS, value: 100},
    ],
    orderBy: [{name: ORDER_FIELD.HAPPINESS}],
  } as QueryInterface,

  /**
   * Last 5 projects
   * Order by date ASC
   */
  [PRE_MADE_QUERY.LAST_PROJECTS]: {
    limit: 5,
    orderBy: [{name: ORDER_FIELD.END_DATE, direction: 'ASC'}],
  } as QueryInterface,

  /**
   * Education by date ASC
   * Order by date ASC
   */
  [PRE_MADE_QUERY.EDUCATION_BY_DATE_ORDER]: {
    orderBy: [{name: ORDER_FIELD.START_DATE, direction: 'ASC'}],
  } as QueryInterface,


  /**
   * Work by date
   * Order by date ASC
   */
  [PRE_MADE_QUERY.WORK_BY_DATE_ORDER]: {
    orderBy: [{name: ORDER_FIELD.START_DATE, direction: 'ASC'}],
  } as QueryInterface,

  /**
   * All stacks
   */
  [PRE_MADE_QUERY.ALL_STACKS]: {
    filters: [
      {name: DATA_FIELD.SKILL_CATEGORY, value: SKILL_CATEGORY.STACK},
    ],
    orderBy: [
      {name: ORDER_FIELD.LEVEL, direction: 'ASC'},
    ],
  } as QueryInterface,

  /**
   * Others skills
   */
  [PRE_MADE_QUERY.OTHERS_SKILLS]: {
    filters: [
      {name: DATA_FIELD.SKILL_CATEGORY, value: SKILL_CATEGORY.DEVOPS},
      {name: DATA_FIELD.SKILL_CATEGORY, value: SKILL_CATEGORY.CMS},
      {name: DATA_FIELD.SKILL_CATEGORY, value: SKILL_CATEGORY.OS},
      {name: DATA_FIELD.SKILL_CATEGORY, value: SKILL_CATEGORY.TOOL},
      {name: DATA_FIELD.SKILL_CATEGORY, value: SKILL_CATEGORY.E2E},
      {name: DATA_FIELD.SKILL_CATEGORY, value: SKILL_CATEGORY.IDE},
    ],
    orderBy: [
      {name: ORDER_FIELD.LEVEL, direction: 'ASC'},
    ],
  } as QueryInterface,

}
