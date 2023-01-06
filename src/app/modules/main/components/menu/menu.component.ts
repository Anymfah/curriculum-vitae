import {Component, NgZone, OnInit} from '@angular/core';
import {MatTabNavPanel} from "@angular/material/tabs";
import {PageService} from "../../../../services/page.service";
import {Router} from "@angular/router";
import {MenuItem} from "./menu.interface";

@Component({
  selector: 'cv-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

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
   */
  public constructor(
    private readonly _pageService: PageService,
    private readonly _router: Router,
    private readonly _ngZone: NgZone,
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

    this._setItemsFromPageService();
    this._setActiveItemFromPageService();
  }

  /**
   * Listen to page service items$ and set the items.
   */
  private _setItemsFromPageService(): void {
    this._pageService.items$.subscribe(items => {
      this.items = items;
      this._ngZone.run(() => {
        this.activeItem = this.items.find(item => item.link ===  this._router.url);
        if (this.activeItem != null) {
          this._activateItem(this.activeItem);
        }
      });
    });
  }

  /**
   * Listen to page service activeItem$ and set the active item.
   */
  private _setActiveItemFromPageService(): void {
    this._pageService.activeItem$.subscribe(item => {
      if (item != null) {
        this.activeItem = item;
        this._activateItem(item);
        this.items = this._pageService.getItems();
      }
    });
  }

  /**
   * @event click on menu item
   * Navigate to the given link.
   * @param item
   */
  public onClicked(item: MenuItem): void {
    this._pageService.navigate(item);
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
