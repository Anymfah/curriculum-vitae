import {AfterContentChecked, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {MatTabNavPanel} from "@angular/material/tabs";
import {PageService} from "../../../../services/page.service";
import {Route, Router} from "@angular/router";
import {MenuItem} from "./menu.interface";

@Component({
  selector: 'cv-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterContentChecked {

  /**
   * Content Panel DOM Element.
   */
  public tabPanel = new MatTabNavPanel();

  /**
   * Reference to the menu items to be displayed.
   */
  public items: MenuItem[] = [];

  /**
   * Current active menu item.
   */
  public activeItem?: MenuItem;

  /**
   * @constructor
   * @param _pageService
   * @param _router
   * @param _ngZone
   * @param _changeDetectorRef
   */
  public constructor(
    private readonly _pageService: PageService,
    private readonly _router: Router,
    private readonly _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef
  ) {

  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    /**
     * Get the tab panel to show the pages.
     */
    this._pageService.pagePanel$.subscribe(pagePanel => {
      if (pagePanel != null) {
        this.tabPanel = pagePanel;
      }
    });

    this._setItemsFromRoutes();
  }

  /**
   * Get Menu items from app routing.
   */
  private _setItemsFromRoutes(): void {
    const items: MenuItem[] = [];
    this._router.config.forEach(route => {

      if (route.data != null && route.data['menuItem'] != null) {
        items.push({
          label: route.data['menuItem'].label,
          link: '/' + route.path,
          index: route.data['menuItem'].index,
        });
      }
    });
    this.items = items;
  }

  /**
   * @inheritDoc
   */
  public ngAfterContentChecked(): void {
    this.activeItem = this.items.find(item => item.link ===  this._router.url);
    if (this.activeItem != null) {
      this._activateItem(this.activeItem);
    }
    this._changeDetectorRef.detectChanges();
  }

  /**
   * @event click on menu item
   * Navigate to the given link.
   * @param item
   */
  public onClicked(item: MenuItem): void {
    if (this.activeItem !== undefined) {
      const direction = this.activeItem.index > item.index;
      this._pageService.setPageDirection(direction);
    }
  }

  /**
   * Activate the given item. Deactivate all other items.
   * @param item
   */
  private _activateItem(item: MenuItem): void {
    this.items.filter(menuItem => menuItem !== item).forEach(menuItem => menuItem.active = false);
    item.active = true;
  }
}
