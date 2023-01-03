import {ProfileMenuItemData} from "./profile.interface";

export class ProfileMenuItem {
  /**
   * Title of the menu item.
   */
  public title: string = '';

  /**
   * Description of the menu item.
   */
  public description: string = '';

  /**
   * Icon of the menu item.
   */
  public icon?: string;

  /**
   * Route of the menu item.
   */
  public route?: string;

  /**
   * Fill percentage of the circle arc
   */
  public fillPercentage: number = 0;

  /**
   * Position of the circle arc in degree.
   */
  public positionDegree: number = 0;

  /**
   * Size of the circle arc.
   */
  public size: number = 310;

  /**
   * Weight of the menu item.
   */
  public weight: number = 80;

  /**
   * Torque of the menu item.
   */
  public torque: number = 0;

  /**
   * Distance of the menu item box.
   */
  public contentOffset: number = 75;

  /**
   * Range of degrees of the menu item.
   */
  private _activeRange: { start: number, end: number } = { start: 0, end: 0 };

  /**
   * Is the menu item active.
   */
  public active = true;

  /**
   * End in degree of the last menu item.
   */
  public static lastEndDegree: number = 0;

  /**
   * @constructor
   */
  public constructor(
    data: ProfileMenuItemData,
    fillPercentage: number,
  ) {
    this.title = data.title;
    this.description = data.description;
    this.fillPercentage = fillPercentage;
    this.icon = data.icon;
    this.route = data.route;
    this.size = data.size ?? this.size;
    this.weight = data.weight ?? this.weight;
    this.torque = data.torque ?? this.torque;
    this.contentOffset = data.contentOffset ?? this.contentOffset;
    this._init();
  }

  /**
   * Init the menu item.
   */
  private _init() {
    this.positionDegree = ProfileMenuItem.lastEndDegree;

    /** Add the fill percentage (to deg) + 2deg (gap) */
    ProfileMenuItem.lastEndDegree += this.fillPercentage * 3.6 + 2;

    this._activeRange = {
      start: this.positionDegree,
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
