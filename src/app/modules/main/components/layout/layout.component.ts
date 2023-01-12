import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {
  ROUTER_LTR_TRANSITION_CONSTANT,
  ROUTER_RTL_TRANSITION_CONSTANT,
} from "../../../../constants/router-transition.constant";
import {PageService} from "../../../../services/page.service";
import {MatTabNavPanel} from "@angular/material/tabs";
import {MenuItem} from "../menu/menu.interface";

@Component({
  selector: 'cv-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [ROUTER_RTL_TRANSITION_CONSTANT, ROUTER_LTR_TRANSITION_CONSTANT]
})
export class LayoutComponent implements OnInit {

  /**
   * Router outlet DOM Element.
   */
  @ViewChild(RouterOutlet) public routerOutlet?: RouterOutlet;

  /**
   * Tab panel DOM Element.
   */
  @ViewChild('tabPanel') public tabPanel?: MatTabNavPanel;

  /** Left to right state (for animation). */
  public ltrState = false;

  /** Right to left state (for animation). */
  public rtlState = false;

  /**
   * Direction value of the image
   * Min : -30 , Max : 30
   */
  public imageDirection: number = 0;

  /**
   * Menu items
   * @todo: Move to routing module
   */
  public menu: MenuItem[] = [
    {
      label: 'Home',
      link: '/',
      index: 0,
    },
    {
      label: 'About me',
      link: '/about-me',
      index: 1,
    },
    {
      label: 'Contact',
      link: '/contact',
      index: 2,
    },
  ];

  /**
   * @constructor
   * @param _pageService
   */
  public constructor(
    private readonly _pageService: PageService,
  ) {}

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    /** Set the tab panel to show the pages. */
    if (this.tabPanel != null) {
      this._pageService.setPagePanel(this.tabPanel);
    }

    /** Get the direction of page change. */
    this._pageService.pageDirection$.subscribe(direction => {
      direction ? this.ltrState = !this.ltrState : this.rtlState = !this.rtlState;
      this._animateBgImageDirection(direction);
    });
  }

  /**
   * On page change, slide the image.
   * @param direction
   * @private
   */
  private _animateBgImageDirection(direction: boolean): void {
    if (direction) {
      this.imageDirection = this.imageDirection < 20 ? this.imageDirection + 10 :
        this.imageDirection + (100 - this.imageDirection) / 10;
    } else {
      this.imageDirection = this.imageDirection > -20 ? this.imageDirection - 10 :
        this.imageDirection - (100 + this.imageDirection) / 10;
    }
  }

}
