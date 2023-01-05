import {AfterViewInit, Component, OnInit} from '@angular/core';
import {animateValueUtil} from "../../../../utils/animate-value.util";
import {ProfileMenuItem} from "./profile.component.model";
import {PROFILE_CONSTANT} from "./profile.constant";
import {ProfileMenuItemData} from "./profile.interface";

@Component({
  selector: 'cv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

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
   * Show profile image
   */
  public showImage = false;
  /**
   * Get the menu items.
   */
  public menuItems: ProfileMenuItem[] = [];

  /** Stop the animation of the Input value */
  private _stopAnimation = false;

  /**
   * @inheritDoc
    */
  public ngOnInit() {
    this._calculateMenuItems();

    // Animate the Input value
    animateValueUtil((val) => {
      /**
       * Stop the animation of the Input value
       * if the user is dragging the Input or clicked on a menu item.
       */
      if (!this._stopAnimation) {
        this.value = val;
        this._calculateActiveMenuItem(this.value);
      }
    }, 0, this.value, 4000, [.5, 0, .2, 1]);

    // Animate the outer circle.
    animateValueUtil((val) => {
      this.outerCircleVal = val;
    }, 0, this.outerCircleVal, 2000, [.77, 0, 0, 1.06])
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.showImage = true;
    }, 2500);
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
   * @event onDragStart
   * @param $event Value of the dragging.
   */
  public onDragStart($event: number): void {
    this._stopAnimation = true;
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
      item.isActive(360 - value);
    });
  }

  /**
   * @event onclick
   * Activate the menu item.
   */
  public onClickMenuItem(item: ProfileMenuItem): void {
    this._stopAnimation = true;
    this.menuItems.forEach((menuItem) => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
    });
    item.active = true;
    animateValueUtil((val) => {
      this.value = val;
    }, this.value, 360 - item.degreeItem, 700, [.02, .55, .32, 1]);
  }
}
