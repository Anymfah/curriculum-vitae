

export enum SKILL_CATEGORY {
  /** Code language */
  CODE_LANGUAGE = 'CODE_LANGUAGE',

  /** Front-End */
  FRONT_END = 'Front-End',

  /** Back-End */
  BACK_END = 'Back-End',

  /** DevOps */
  DEVOPS = 'DevOps',

  /** Database */
  DATABASE = 'Database',

  /** End to End */
  E2E = 'End to End',

  /** Application */
  APPLICATION = 'Logiciel',

  /** Library */
  LIBRARY = 'Library',

  /** Framework */
  FRAMEWORK = 'Framework',

  /** CMS */
  CMS = 'CMS',

  /** OS */
  OS = 'OS',

  /** IDE */
  IDE = 'IDE',

  /** Tools */
  TOOL = 'Outils',

  /** Music */
  MUSIC = 'Musique',

  /** Design */
  DESIGN = 'Design',

  /** Others */
  OTHERS = 'Autres',
}

export enum SKILL_TITLE {
  HTML = 'HTML',
  CSS = 'CSS',
  SCSS = 'SCSS',
  DART_SASS = 'Dart Sass',
  LESS = 'LESS',
  JAVASCRIPT = 'JavaScript',
  NODE_JS = 'NodeJS',
  TYPESCRIPT = 'TypeScript',
  ANGULAR = 'Angular',
  REACT = 'React',
  VUE = 'VueJS',
  SYMFONY = 'Symfony',
  ZEND = 'Zend',
  LARAVEL = 'Laravel',
  PHP = 'PHP',
  JAVA = 'Java',
  C_SHARP = 'C#',
  C_PLUS_PLUS = 'C++',
  C = 'C',
  PYTHON = 'Python',
  TWIG = 'Twig',
  MONGODB = 'MongoDB',
  MYSQL = 'MySQL',
  POSTGRESQL = 'PostgreSQL',
  REDIS = 'Redis',
  GIT = 'Git',
  WEBPACK = 'Webpack',
  GULP = 'Gulp',
  BOOTSTRAP = 'Bootstrap',
  FOUNDATION = 'Foundation',
  ANGULAR_MATERIAL = 'Angular Material',
  MATERIAL_UI = 'Material UI',
  BULMA = 'Bulma',
  TAILWIND_CSS = 'Tailwind CSS',
  JQUERY = 'jQuery',
  RXJS = 'RxJS',
  NESTJS = 'NestJS',
  EXPRESS = 'Express',
  JEST = 'Jest',
  MOCHA = 'Mocha',
  CHAI = 'Chai',
  CYPRUS = 'Cypress',
  JASMINE = 'Jasmine',
  KARMA = 'Karma',
  PROTRACTOR = 'Protractor',
  STORYBOOK = 'Storybook',
  DOCKER = 'Docker',
  NGINX = 'Nginx',
  APACHE = 'Apache',
  AWS = 'AWS',
  GITHUB = 'GitHub',
  GITLAB = 'GitLab',
  JENKINS = 'Jenkins',
  SONARQUBE = 'SonarQube',
  BITBUCKET = 'Bitbucket',
  JIRA = 'Jira',
  CONFLUENCE = 'Confluence',
  POSTMAN = 'Postman',
  BASH = 'Bash',
  LINUX = 'Linux',
  WINDOWS = 'Windows',
  MAC_OS = 'MacOS',
  FLASH = 'Flash',
  TOON_BOOM_HARMONY = 'Toon Boom Harmony',
  MAYA3D = 'Maya 3D',
  BLENDER = 'Blender',
  PHOTOSHOP = 'Photoshop',
  ILLUSTRATOR = 'Illustrator',
  FIGMA = 'Figma',
  XD = 'Adobe XD',
  PREMIERE_PRO = 'Premiere Pro',
  AFTER_EFFECTS = 'After Effects',
  INDESIGN = 'InDesign',
  CUBASE = 'Cubase',
  REAPER = 'Reaper',
  PRO_TOOLS = 'Pro Tools',
  ABLETON_LIVE = 'Ableton Live',
  WORDPRESS = 'WordPress',
  JOOMLA = 'Joomla',
  DRUPAL = 'Drupal',
  MAGENTO = 'Magento',
  SHOPIFY = 'Shopify',
  WOOCOMMERCE = 'WooCommerce',
  PRESTASHOP = 'PrestaShop',
  OPEN_CART = 'OpenCart',
  WEBSTORM = 'WebStorm',
  VISUAL_STUDIO_CODE = 'Visual Studio Code',
  SUBLIME_TEXT = 'Sublime Text',
  ATOM = 'Atom',
  BRACKETS = 'Brackets',
  PHP_STORM = 'PhpStorm',
  XCODE = 'XCode',
  TRELLO = 'Trello',
  CLICK_UP = 'ClickUp',
  WRIKE = 'Wrike',
  SLACK = 'Slack',
  DISCORD = 'Discord',
  DRAWING = 'Dessin 2D',
  TECHNICAL_ENGLISH = 'Anglais technique',
  FRENCH = 'Français',
  AGILE = 'Agile',
  MASTERING = 'Mastering',
  MIXING = 'Mixing',
  RECORDING = 'Enregistrement',
  MUSIC_THEORY = 'Théorie musicale',
  MAO = 'MAO',
  COMPOSITION = 'Composition',
  VIOLIN = 'Violon',
  PIANO = 'Piano',
  GUITAR = 'Guitare',
}

export enum WORK_CATEGORY {
  WEBSITE_DEVELOPMENT = 'Développement Web',
  WEBSITE_DESIGN = 'Design Web',
  WEB_APPLICATION = 'Application Web',
  MOBILE_APPLICATION = 'Application Mobile',
  EMAILING = 'Emailing',
  MAILING = 'Mailing postal',
  GRAPHIC_DESIGN = 'Design Graphique',
  MUSIC_PRODUCTION = 'Production musicale',
  VIDEO_PRODUCTION = 'Production vidéo',
  OTHERS = 'Autres',
}

/**
 * Data Type of entity extending the AbstractEntity
 */
export enum DATA_TYPE {
  SKILL = 'SKILL',
  WORK = 'WORK',
  PROJECT = 'PROJECT',
  EDUCATION = 'EDUCATION',
}

/**
 * Enum Order by
 * @see QueryInterface
 */
export enum ORDER_BY {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Data fields of Entities
 * @see QueryInterface
 */
export enum DATA_FIELD {
  ID = 'id',
  NAME = 'name',
  SUBTITLE = 'subtitle',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  LEVEL = 'level',
  HAPPINESS = 'happiness',
  EXPERIENCE = 'experience',
  FAVORITE = 'favorite',
  SKILL_CATEGORY = 'skillCategory',
  SKILL_ENTITY = 'skills',
  PROJECT_ENTITY = 'projects',
  WORK_CATEGORY = 'workCategory',
}

/**
 * Enum Order by field
 * @see QueryInterface
 */
export enum ORDER_BY_FIELD {
  START_DATE = 'startDate',
  NAME = 'name',
  HAPPINESS = 'happiness',
  LEVEL = 'level',
  EXPERIENCE = 'experience',
}

