import {ProfileMenuItemData} from "./profile.interface";
import {ProfileMode} from "./profile.enum";

export const PROFILE_CONSTANT = {
  /**
   * Graphical menu degree start.
   */
  MENU_DEGREE_START: {
    [ProfileMode.SMALL]: -90,
    [ProfileMode.LARGE]: 0,
  },

  /**
   * Graphical menu degree end. (from 0 to 360)
   *
   * Will be relative to the MENU_DEGREE_START.
   */
  MENU_DEGREE_END: {
    [ProfileMode.SMALL]: 90,
    [ProfileMode.LARGE]: 270,
  },

  /**
   * MENU_DATA
   */
  MENU_DATA: [
    { // * About
      routerLink: '/',
      importance: 10,
      circleMenuItem: {
        title: 'À Propos',
        description: '<p>Développeur Web Front-End</p><p>35 ans</p><p>Vit à Angoulême</p>',
        size: 250,
        weight: 50,
        torque: 10,
        contentOffset: 50,
      },
      drawCircleItem: {
        size: 276,
        weight: 4
      },
    },
    // * Skills
    {
      routerLink: '/skills',
      importance: 40,
      offset: 20,

      circleMenuItem: {
        title: 'Compétences',
        description: 'Liste de mes compétences',
        size: 310,
        weight: 55,
        torque: -30,
        contentOffset: 35,
      },
      drawCircleItem: {
        size: 310,
        weight: 17
      },
    },
    // * Experience
    {
      importance: 20,
      circleMenuItem: {
        title: 'Experience',
        description: 'Lorem ipsum dolor sit amet',
        size: 310,
        weight: 80,
        torque: -25,
        contentOffset: 10,
      },
      drawCircleItem: {
        size: 310,
        weight: 17
      },
    },
    // * Education
    {
      importance: 10,
      circleMenuItem: {
        title: 'Education',
        description: 'Lorem ipsum dolor sit amet',
        size: 250,
        contentOffset: 50,
        weight: 80,
      },
      drawCircleItem: {
        size: 276,
        weight: 4
      },
    },
    // * Contact
    {
      routerLink: '/contact',
      importance: 10,
      circleMenuItem: {
        title: 'Contact',
        description: 'Lorem ipsum dolor sit amet',
        size: 250,
        weight: 20,
      },
      drawCircleItem: {
        size: 276,
        weight: 4
      },
    },
    ] as ProfileMenuItemData[]
  }
