import {ProfileMenuItemData} from "./profile.interface";
import {iCircleMenuItem} from "../circle-menu-item/circle-menu-item.interface";
import {iDrawCircle} from "../../../shared/draw-circle/draw-circle.interface";

export class ProfileMenuItem {
  /**
   * Icon of the menu item.
   */
  public icon?: string;

  /**
   * Route of the menu item.
   */
  public route?: string;

  /**
   * @default Size of the circle arc.
   */
  public defaultSize: number = 310;

  /**
   * @default Weight of the menu item.
   */
  public defaultWeight: number = 80;

  /**
   * @default Torque of the menu item.
   */
  public defaultTorque: number = 0;

  /**
   * @default Distance of the menu item box.
   */
  public defaultContentOffset: number = 75;

  /**
   * Range of degrees of the menu item.
   */
  private _activeRange: { start: number, end: number } = { start: 0, end: 0 };

  /**
   * Get middle degree of the menu item.
   */
  public get degreeItem(): number {
    return (this._activeRange.start + this._activeRange.end) / 2;
  }

  /**
   * Is the menu item active.
   */
  public active = false;

  /**
   * End in degree of the last menu item.
   */
  public static lastEndDegree: number = 0;

  /**
   * Get the menu item as circle menu item.
   */
  public circleMenuItem: iCircleMenuItem;

  /**
   * Get the menu item as drawn circle. (used for button)
   */
  public drawCircleItem: iDrawCircle;

  /**
   * @constructor
   */
  public constructor(
    data: ProfileMenuItemData,
    fillPercentage: number,
  ) {
    this.circleMenuItem = {
      title: data.title,
      description: data.description,
      size: data.circleMenuItem.size ?? this.defaultSize,
      fillPercentage,
      weight: data.circleMenuItem.weight ?? this.defaultWeight,
      torque: data.circleMenuItem.torque ?? this.defaultTorque,
      contentOffset: data.circleMenuItem.contentOffset ?? this.defaultContentOffset,
    }
    this.drawCircleItem = data.drawCircleItem;
    this.icon = data.icon;
    this.route = data.route;
    this._init();
  }

  /**
   * Init the menu item.
   */
  private _init() {
    this.circleMenuItem.positionDegree = ProfileMenuItem.lastEndDegree;

    /** Add the fill percentage (to deg) + 2deg (gap) */
    if (this.circleMenuItem.fillPercentage != null) {
      ProfileMenuItem.lastEndDegree += this.circleMenuItem.fillPercentage * 3.6 + 2;
    }


    this._activeRange = {
      start: this.circleMenuItem.positionDegree,
      end: ProfileMenuItem.lastEndDegree,
    }
  }

  /**
   * Check if value is in the active range.
   */
  public isActive(value: number): void {
    this.active = value >= this._activeRange.start && value <= this._activeRange.end;
  }
}
