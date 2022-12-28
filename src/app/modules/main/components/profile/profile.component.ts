import {Component, OnInit} from '@angular/core';
import {animateValueUtil} from "../../../../utils/animate-value.util";

@Component({
  selector: 'cv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  /**
   * Outer circle fill percentage.
   * Usefully for animations.
   */
  public outerCircleVal = 100;

  /**
   * @constructor
   */
  public constructor() {
  }

  /**
   * @inheritDoc
    */
  public ngOnInit() {
    animateValueUtil((val) => {
      this.outerCircleVal = val;
    }, 0, this.outerCircleVal, 2000, [.77, 0, 0, 1.06])
  }

}
