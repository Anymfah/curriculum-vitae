import {Component, OnInit} from '@angular/core';
import {animateValueUtil} from "../../../../utils/animate-value.util";
import {ProfileMenuItem} from "./profile.component.model";
import {PROFILE_CONSTANT} from "./profile.constant";
import {ProfileMenuItemData} from "./profile.interface";

@Component({
  selector: 'cv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  /**
   * Value between 0 and 360.
   */
  public value = 340;

  /**
   * Outer circle fill percentage.
   * Usefully for animations.
   */
  public outerCircleVal = 100;

  /**
   * Data Of the menu items
   */
  private menuItemsData: ProfileMenuItemData[] = PROFILE_CONSTANT.MENU_DATA;

  /**
   * Get the menu items.
   */
  public menuItems: ProfileMenuItem[] = [];

  /**
   * @inheritDoc
    */
  public ngOnInit() {
    this._calculateMenuItems();
    animateValueUtil((val) => {
      this.outerCircleVal = val;
    }, 0, this.outerCircleVal, 2000, [.77, 0, 0, 1.06])
  }

  /**
   * Set the menu items.
   */
  private _calculateMenuItems(): void {
    let totalImportance = 0;
    ProfileMenuItem.lastEndDegree = PROFILE_CONSTANT.MENU_DEGREE_START;
    this.menuItemsData.forEach((item) => {
      totalImportance += item.importance;
    });
    this.menuItemsData.forEach((item) => {
      // 72.9 = 100 - 25 - 2.1 = 100% - quarter circle - 2.1% (is the gap between the menu items)
      const maxFillPercentage = 100 - PROFILE_CONSTANT.MENU_DEGREE_END / 3.6 - 2.1;
      const fillPercentage = (item.importance / totalImportance) * maxFillPercentage;
      this.menuItems.push(new ProfileMenuItem(item, fillPercentage));
    });
  }

  /**
   * @event onDragging
   * @param $event Value of the dragging.
   */
  public onTriggerDragging($event: number): void {
    this.value = $event;
    this._calculateActiveMenuItem($event)
  }

  /**
   * Set the active menu item.
   */
  private _calculateActiveMenuItem(value: number): void {
    this.menuItems.forEach((item) => {
      //todo: comment
      item.active = true;
      //todo: Uncomment
      //item.isActive(360 - value);
    });
  }
}
