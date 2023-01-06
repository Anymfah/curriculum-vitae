import { Injectable } from '@angular/core';
import {MatTabNavPanel} from "@angular/material/tabs";
import {BehaviorSubject} from "rxjs";
import {MenuItem} from "../modules/main/components/menu/menu.interface";
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  /**
   * The tab panel to show the pages as BehaviorSubject.
   */
  private _pagePanel = new BehaviorSubject<MatTabNavPanel | null>(null);

  /**
   * The tab panel to show the pages as Observable.
   */
  public pagePanel$ = this._pagePanel.asObservable();

  /**
   * The page direction
   */
  private _pageDirection = new BehaviorSubject<boolean>(false);

  /**
   * The page direction as Observable.
   */
  public pageDirection$ = this._pageDirection.asObservable();

  /**
   * Reference to the menu items to be displayed. as BehaviorSubject.
   */
  private _items = new BehaviorSubject<MenuItem[]>([]);

  /**
   * Reference to the menu items to be displayed. as Observable.
   */
  public items$ = this._items.asObservable();

  /**
   * Current active menu item. as BehaviorSubject.
   */
  private _activeItem = new BehaviorSubject<MenuItem | undefined>(undefined);

  /**
   * Current active menu item. as Observable.
   */
  public activeItem$ = this._activeItem.asObservable();


  /**
   * @constructor
   * @param _router
   */
  public constructor(private readonly _router: Router,) {
    this._setActiveItemFromUrl();
    this._setItemsFromRoutes();
  }

  /**
   * Sets the active item from the current url.
   */
  private _setActiveItemFromUrl(): void {
    const currentUrl = this._router.url;
    const items = this._items.getValue();
    items.forEach(item => {
      if (currentUrl === item.link) {
        this.activateItem(item);
      }
    });
  }

  /**
   * Set Menu items from app routing
   */
  private _setItemsFromRoutes(): void {
    const items: MenuItem[] = [];
    this._router.config.forEach((route: Route) => {
      if (route.data != null && route.data['menuItem'] != null) {
        items.push({
          label: route.data['menuItem'].label,
          link: '/' + route.path,
          index: route.data['menuItem'].index,
        });
      }
    });
    this._items.next(items);
  }

  /**
   * @method Activate the given menu item. Deactivate all other menu items.
   * @param item
   */
  public activateItem(item: MenuItem): void {
    this._items.getValue().forEach(menuItem => {
      menuItem.active = menuItem === item;
    });
    this._activeItem.next(item);
  }

  /**
   * Sets the tab panel to show the pages.
   * @param pagePanel
   */
  public setPagePanel(pagePanel: MatTabNavPanel | null): void {
    this._pagePanel.next(pagePanel);
  }

  /**
   * Sets the page direction.
   * @param pageDirection true = the clicked item is after the current item.
   */
  public setPageDirection(pageDirection: boolean): void {
    this._pageDirection.next(pageDirection);
  }

  /**
   * @method Get Items
   */
  public getItems(): MenuItem[] {
    return this._items.getValue();
  }

  /**
   * @event click on menu item
   * @method navigate - Page Change
   * @param item menu item
   */
  public navigate(item: MenuItem): void {
    const activeItemIndex = this._activeItem.getValue()?.index ?? 0;
    this.activateItem(item);
    const direction = item.index > activeItemIndex;
    this.setPageDirection(direction);
    this._router.navigate([item.link]).then();
  }
}
