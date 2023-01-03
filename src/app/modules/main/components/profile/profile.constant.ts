import {ProfileMenuItemData} from "./profile.interface";

export const PROFILE_CONSTANT = {
  /**
   * Graphical menu degree start.
   */
  MENU_DEGREE_START: 0,

  /**
   * Graphical menu degree end. (from 0 to 360)
   * 0 = 12 o'clock
   * 90 = 3 o'clock
   * 180 = 6 o'clock
   *
   * Will be relative to the MENU_DEGREE_START.
   */
  MENU_DEGREE_END: 90,

  /**
   * MENU_DATA
   */
  MENU_DATA: [
      {
        title: 'About',
        description: 'Lorem ipsum dolor sit amet',
        importance: 10,
        size: 250,
        weight: 50,
        torque: 10,
        contentOffset: 50
      },
      {
        title: 'Skills',
        description: 'Lorem ipsum dolor sit amet',
        importance: 40,
        weight: 55,
        torque: -30,
        contentOffset: 35
      },
      {
        title: 'Experience',
        description: 'Lorem ipsum dolor sit amet',
        importance: 20,
        torque: -25,
        contentOffset: 10
      },
      {
        title: 'Education',
        description: 'Lorem ipsum dolor sit amet',
        importance: 10,
        size: 250,
        contentOffset: 50
      },
      {
        title: 'Contact',
        description: 'Lorem ipsum dolor sit amet',
        importance: 10,
        size: 250,
        weight: 20,
      }
    ] as ProfileMenuItemData[]
  }
