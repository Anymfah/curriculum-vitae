import {ProfileMenuItemData} from "./profile.interface";
import {iCircleMenuItem} from "../circle-menu-item/circle-menu-item.interface";
import {iDrawCircle} from "../../../shared/draw-circle/draw-circle.interface";
import {ProfileMode} from "./profile.enum";

/**
 * Model of a profile menu item.
 * Used by ProfileComponent.
 * @see ProfileComponent
 * @see ProfileMenuItemData
 * @see iCircleMenuItem
 * @see iDrawCircle
 * @see ProfileMode
 */
export class ProfileMenuItem {

  /**
   * ID of the menu item.
   */
  public id: string;

  /**
   * Route to the menu item.
   */
  public routerLink?: string;

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
   * Offset for making the importance
   * of the drawn circle bigger or smaller.
   */
  private _offset: number = 0;

  /**
   * End in degree of the last menu item.
   */
  public static lastEndDegree: number = 0;

  /**
   * End in degree of the last drawn circle arc
   */
  public static lastEndDrawCircleDegree: number = 0;

  /**
   * Get the menu item as circle menu item.
   */
  public circleMenuItem: iCircleMenuItem = {};

  /**
   * Menu item as circle menu item (initial)
   */
  private _circleMenuItem: iCircleMenuItem = {};

  /**
   * Get the menu item as drawn circle. (used for button)
   */
  public drawCircleItem: iDrawCircle = {};

  /**
   * Menu item as drawn circle. (used for button) (initial)
   */
  private _drawCircleItem: iDrawCircle = {};

  /**
   * @constructor
   */
  public constructor(id: string) {
    this.id = id;
  }

  /**
   * Set Data
   */
  public setData(data: ProfileMenuItemData, fillPercentage: number): void {
    this._circleMenuItem = {
      ...data.circleMenuItem,
      fillPercentage,
    }
    this.routerLink = data.routerLink;
    this._offset = data.offset ?? 0;
    this._drawCircleItem = data.drawCircleItem;
    this._init();
  }

  /**
   * Update view values with view mode.
   */
  private _init(): void {
    this.circleMenuItem = {...this._circleMenuItem};
    this._createDrawCircleItem();
    this.circleMenuItem.positionDegree = ProfileMenuItem.lastEndDegree;

    this._updateLastEndDegree();
    this._setActiveRange();
  }

  /**
   * Create drawCircleItem position and size from circleMenuItem data
   */
  private _createDrawCircleItem(): void {
    this.drawCircleItem.weight = this._drawCircleItem.weight;
    this.drawCircleItem.size = this._drawCircleItem.size;
    if (ProfileMenuItem.lastEndDrawCircleDegree !== ProfileMenuItem.lastEndDegree) {
      this._offset += ProfileMenuItem.lastEndDegree - ProfileMenuItem.lastEndDrawCircleDegree;
    }
    if (this.circleMenuItem.fillPercentage != null) {
      this.drawCircleItem.arcDegree = this.circleMenuItem.fillPercentage * 3.6 + this._offset;
    }
    this.drawCircleItem.positionDegree = ProfileMenuItem.lastEndDrawCircleDegree;
  }

  /**
   * Update the last end degree. (used for next menu item)
   * Add the fill percentage (to deg) + 2deg (gap)
   */
  private _updateLastEndDegree() {
    if (this.circleMenuItem.fillPercentage !== undefined) {
      ProfileMenuItem.lastEndDegree += this.circleMenuItem.fillPercentage * 3.6 + 2;
    }
    if (this.drawCircleItem.arcDegree !== undefined) {
      ProfileMenuItem.lastEndDrawCircleDegree += this.drawCircleItem.arcDegree + 2;
    }
  }

  private _setActiveRange() :void {
    this._activeRange = {
      start: this.drawCircleItem.positionDegree ?? 0,
      end: ProfileMenuItem.lastEndDrawCircleDegree,
    }
  }

  /**
   * Check if value is in the active range.
   */
  public isActive(value: number): void {

    if (this._activeRange.start < 0 && this._activeRange.end < 0) {
      const reversedValue = -Math.abs(360 - value);
      this.active =
        reversedValue >= this._activeRange.start &&
        reversedValue <= this._activeRange.end;
    } else if (this._activeRange.start < 0) {
      const reversedValue = 360 - value;
      this.active =
        reversedValue <= Math.abs(this._activeRange.start) ||
        value <= this._activeRange.end;
    } else if (this._activeRange.end > 360) {
      this.active = value >= this._activeRange.start && value <= this._activeRange.end - 360;
    } else {
      this.active = value >= this._activeRange.start && value <= this._activeRange.end;
    }
    //this.active = value >= this._activeRange.start && value <= this._activeRange.end;
  }

  /**
   * @method Change lastEndDegree value from outside.
   */
  public static setLastEndDegree(value: number): void {
    ProfileMenuItem.lastEndDegree = value;
    ProfileMenuItem.lastEndDrawCircleDegree = value;
  }
}
