import {ProfileMenuItemData} from "./profile.interface";
import {iDrawCircle} from "../../../shared/draw-circle/draw-circle.interface";

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

        circleMenuItem: {
          size: 250,
          weight: 50,
          torque: 10,
          contentOffset: 50,
        },
        drawCircleItem: {
          size: 276,
          positionDegree: 331,
          arcDegree: 29,
          weight: 4
        },
      },
      {
        title: 'Skills',
        description: 'Lorem ipsum dolor sit amet',
        importance: 40,

        circleMenuItem: {
          weight: 55,
          torque: -30,
          contentOffset: 35,
        },
        drawCircleItem: {
          size: 310,
          positionDegree: 181,
          arcDegree: 148,
          weight: 17
        },
      },
      {
        title: 'Experience',
        description: 'Lorem ipsum dolor sit amet',
        importance: 20,
        circleMenuItem: {
          torque: -25,
          contentOffset: 10,
        },
        drawCircleItem: {
          size: 310,
          positionDegree: 152,
          arcDegree: 27,
          weight: 17
        },
      },
      {
        title: 'Education',
        description: 'Lorem ipsum dolor sit amet',
        importance: 10,
        circleMenuItem: {
          size: 250,
          contentOffset: 50,
        },
        drawCircleItem: {
          size: 276,
          positionDegree: 121,
          arcDegree: 29,
          weight: 4
        },
      },
      {
        title: 'Contact',
        description: 'Lorem ipsum dolor sit amet',
        importance: 10,
        circleMenuItem: {
          size: 250,
          weight: 20,
        },
        drawCircleItem: {
          size: 276,
          positionDegree: 89,
          arcDegree: 30,
          weight: 4
        },
      }
    ] as ProfileMenuItemData[]
  }
