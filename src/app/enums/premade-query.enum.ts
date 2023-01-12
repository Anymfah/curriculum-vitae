
export enum PRE_MADE_QUERY {
  /**
   * Best skills favorite.
   * Happiness 100
   * Order by happiness ASC
   * show value "Experience"
   * @see SkillEntity
   */
  STACKS_BEST_FAVORITES = 'stacksBestFavorites',

  /**
   * Last 5 projects
   */
  LAST_PROJECTS = 'lastProjects',

  /**
   * Education by date ASC
   */
  EDUCATION_BY_DATE_ORDER = 'educationByDateOrder',

  /**
   * Work by date order
   */
  WORK_BY_DATE_ORDER = 'workByDateOrder',

  /**
   * All stacks
   */
  ALL_STACKS = 'allStacks',
}
