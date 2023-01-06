import {iDrawCircle} from "../../../shared/draw-circle/draw-circle.interface";
import {iCircleMenuItem} from "../circle-menu-item/circle-menu-item.interface";

/**
 * Interface of a profile menu item data.
 * Used by ProfileMenuItem Model.
 * @see ProfileMenuItem
 */
export interface ProfileMenuItemData {
  /**
   * Importance of the menu item will be used
   * to calculate the arc degree size of the menu item
   * and the drawn circle between all other menu items.
   */
  importance: number;
  /**
   * Offset for making the importance
   * of the drawn circle bigger or smaller.
   *
   * Changing this will automatically change
   * the next item's offset by adding the missing offset
   * or subtracting the exceeding offset.
   *
   * Unit is in degree, so be carefully with the value you set,
   * or it may break the menu. Recommended value is between -30 and 30.
   *
   * Also notice that the menu will be drawn in a counterclockwise direction.
   */
  offset?: number;
  circleMenuItem: iCircleMenuItem;
  drawCircleItem: iDrawCircle;
  routerLink?: string;
}
