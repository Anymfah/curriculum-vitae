import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animateValueUtil} from "../../../../utils/animate-value.util";
import {ProfileMenuItem} from "./profile.component.model";
import {PROFILE_CONSTANT} from "./profile.constant";
import {ProfileMenuItemData} from "./profile.interface";
import {ProfileMode} from "./profile.enum";
import {PageService} from "../../../../services/page.service";
import {Router} from "@angular/router";
import {BaseComponent} from '../../../shared/base/base.component';

@Component({
  selector: 'cv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit, AfterViewInit, OnChanges {

  /**
   * ViewMode : Large or Small
   */
  @Input() public viewMode: ProfileMode = ProfileMode.LARGE;

  /**
   * Value between 0 and 360.
   */
  public value = -360;

  /**
   * Outer circle fill percentage.
   * Usefully for animations.
   */
  public outerCircleVal = 100;

  /**
   * Data Of the menu items
   */
  private readonly menuItemsData: ProfileMenuItemData[] = PROFILE_CONSTANT.MENU_DATA;

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
   * Initialized ?
   */
  private _isInitialized: boolean = false;

  /**
   * @constructor
   * @param _pageService
   * @param _router
   */
  public constructor(
    private readonly _pageService: PageService,
    private readonly _router: Router,
  ) {
    super();
  }

  /**
   * @inheritDoc
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if ('viewMode' in changes) {
      this._updateMode();
    }
  }

  /**
   * @inheritDoc
    */
  public ngOnInit() {
    this._updateMode();
    this._subscribe(this._pageService.activeItem$, (activeItem) => {
      if (activeItem) {
        const item = this._getMenuItemByRouterLink(activeItem.link);
        if (item != null && this._isInitialized) {
          this._moveMenuCursorToItem(item);
        } else if (!this._isInitialized) {
          this._isInitialized = true;
          this._animateLoad(item ?? this.menuItems[0]);
        }
      }
    });
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
   * Get Menu item by router link.
   */
  private _getMenuItemByRouterLink(routerLink: string): ProfileMenuItem | undefined {
    return this.menuItems.find((item) => item.routerLink === routerLink);
  }

  /**
   * Animate the Input value and circles at first load.
   * @param item The menu item for moving the cursor to.
   */
  private _animateLoad(item: ProfileMenuItem): void {
    const value = 360 - item.degreeItem;
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
    }, value - 360, value, 4000, [.5, 0, .2, 1]);

    // Animate the outer circle.
    animateValueUtil((val) => {
      this.outerCircleVal = val;
    }, 0, this.outerCircleVal, 2000, [.77, 0, 0, 1.06])
  }

  /**
   * Change the mode of the profile.
   */
  private _updateMode(): void {
    this._calculateMenuItems(this.menuItems.length > 0 ? 'update' : 'create');
  }

  /**
   * Get total importance of the menu items.
   * We need this to calculate the fill percentage of the menu items.
   */
  private _getTotalImportance(): number {
    let totalImportance = 0;
    this.menuItemsData.forEach((item) => {
      totalImportance += item.importance;
    });
    return totalImportance;
  }

  /**
   * Get Max fill percentage for mode.
   * @formula
   * 100%
   * - (360° - (dead arc circle is (start + end) / 3.6))
   * - (2.1 % gap between items)
   */
  private _getMaxFillPercentage(): number {
    return 100
      - (360 - PROFILE_CONSTANT.MENU_DEGREE_END[this.viewMode]
        + PROFILE_CONSTANT.MENU_DEGREE_START[this.viewMode]) / 3.6
      - 2.1;
  }

  /**
   * Calculate the menu items to get the fill percentages
   * and the degree of the menu items for the current mode.
   */
  private _calculateMenuItems(mode: 'create' | 'update' = 'create'): void {
    const totalImportance = this._getTotalImportance();
    const startDegree = PROFILE_CONSTANT.MENU_DEGREE_START[this.viewMode];
    ProfileMenuItem.setLastEndDegree(startDegree);
    const maxFillPercentage = this._getMaxFillPercentage();
    this.menuItemsData.forEach((dataItem, index) => {
      // Deep clone to not modify the original data.
      const item: ProfileMenuItemData = structuredClone(dataItem);
      const fillPercentage = (dataItem.importance / totalImportance) * maxFillPercentage;
      if (item.drawCircleItem.positionDegree != null && dataItem.drawCircleItem.positionDegree != null) {
        item.drawCircleItem.positionDegree = dataItem.drawCircleItem.positionDegree - startDegree;
      }

      if (mode === 'create') {
        /** Create New instance of ProfileMenuItem */
        const menuItem = new ProfileMenuItem(index.toString());
        menuItem.setData(item, fillPercentage);
        /** Draw the menu item */
        this.menuItems.push(menuItem);
      } else {
        /** Update the existing menu item */
        const menuItem = this.menuItems.find((menuItem) => menuItem.id === index.toString());
        if (menuItem) {
          menuItem.setData(item, fillPercentage);
        }
      }
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
    //this._pageService.setPageDirection(true);
    if (item.routerLink != null) {
      this._pageService.navigate(item.routerLink);
    } else {
      this._moveMenuCursorToItem(item);
    }
  }

  /**
   * Move the menu cursor to the clicked menu item.
   * @param item The clicked menu item.
   */
  private _moveMenuCursorToItem(item: ProfileMenuItem): void {
    this._stopAnimation = true;
    this._toggleActiveMenuItem(item);
    animateValueUtil((val) => {
      this.value = val;
    }, this.value, 360 - item.degreeItem, 700, [.02, .55, .32, 1]);
  }

  /**
   * Toggle active menu item.
   */
  private _toggleActiveMenuItem(item: ProfileMenuItem): void {
    this.menuItems.forEach((menuItem) => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
    });
    item.active = true;
  }
}
