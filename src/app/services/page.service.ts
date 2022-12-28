import { Injectable } from '@angular/core';
import {MatTabNavPanel} from "@angular/material/tabs";
import {BehaviorSubject} from "rxjs";

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


  public constructor() { }

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
}
