import {iDrawCircle} from "../../../shared/draw-circle/draw-circle.interface";
import {iCircleMenuItem} from "../circle-menu-item/circle-menu-item.interface";

/**
 * Interface of a profile menu item data.
 * Used by ProfileMenuItem Model.
 * @see ProfileMenuItem
 */
export interface ProfileMenuItemData {
  title: string;
  description: string;
  importance: number;
  size?: number;
  weight?: number;
  torque?: number;
  contentOffset?: number;
  icon?: string;
  route?: string;
  circleMenuItem: iCircleMenuItem;
  drawCircleItem: iDrawCircle;
}
