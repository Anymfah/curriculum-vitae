import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animateValueUtil} from "../../../../utils/animate-value.util";

@Component({
  selector: 'cv-circle-menu-item',
  templateUrl: './circle-menu-item.component.html',
  styleUrls: ['./circle-menu-item.component.scss']
})
export class CircleMenuItemComponent implements OnChanges, OnInit {

  /**
   * Title of the menu item.
   */
  @Input() public title: string = 'Some Title';

  /**
   * Description of the menu item.
   */
  @Input() public description: string = 'Lorem ipsum dolor sit amet';

  public weightValue = 0;

  /**
   * Size of the circle diameter.
   */
  @Input() public size = 310;

  /**
   * Fill percentage of the circle arc
   */
  @Input() public fillPercentage: number = 30;

  /**
   * Position of the circle arc.
   */
  @Input() public positionDegree: number = 0;

  /**
   * Max Weight
   */
  @Input() public weight: number = 80;

  /**
   * Torque in degrees of the starting point for the
   * content box position.
   * Default is 0. Range is -180 to 180.
   */
  @Input() public torque = 0;

  /**
   * Distance of the content box from the edge of the circle arc.
   */
  @Input() public contentOffset = 75;

  /**
   * Position in percentage from top left corner of the
   * circle wrapper.
   */
  public svgWrapperPosition: { x: number, y: number } = {x: 0, y: 0};

  /**
   * Rotate angle of the svg wrapper.
   */
  public svgWrapperRotate: string = 'rotate(0deg)';

  /**
   * Activate the circle menu item
   * add active class.
   */
  @HostBinding('class.active') @Input() public active = true;

  /**
   * Position of the content box.
   * Same as swgWrapperPosition but with 50px offset.
   */
  public contentPosition : { x: number, y: number } = {x: 0, y: 0};

  /**
   * Add left or right class to the content box.
   * left if the content box is on the left side of the circle arc.
   * right if the content box is on the right side of the circle arc.
   */
  public contentSide: 'left' | 'right' = 'left';

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this._calculateStrokesPoints();
  }

  /**
   * Calculate the position points of the stroke
   * line of the circle arc to the content box.
   */
  private _calculateStrokesPoints(): void {
    const fillDegree = this.fillPercentage / 100 * 360;
    const arcCenterAngle = (this.positionDegree + fillDegree / 2) - 90 + this.torque;
    this.svgWrapperRotate = `rotate(${-arcCenterAngle - 180}deg)`;

    /**
     * Calculate svgWrapperPosition
     * x is the distance in % between the left side of the
     * circle wrapper and center of the circle arc.
     * y is the distance in % between the top side of the
     * circle wrapper and center of the circle arc.
     */
    /** Formula: x = cos(angle) * radius */
    const x = Math.cos(arcCenterAngle * Math.PI / 180) * 50;
    /** Formula: y = sin(angle) * radius */
    const y = Math.sin(arcCenterAngle * Math.PI / 180) * 50;

    // Reverse x and add 50% to x and y to get the position
    this.svgWrapperPosition = {x:100 - (x + 50), y: y + 50};

    // Set the content position (same as svgWrapperPosition but with 100px more radius)
    // Todo: Calc offset (should be something like (this.size + this.weight) * 100 / offsetRadius + 50)
    /*const offset = 69.28;
    const contentX = Math.cos(arcCenterAngle * Math.PI / 180) * offset;
    const contentY = Math.sin(arcCenterAngle * Math.PI / 180) * offset;
    this.contentPosition = {
      x: 100 - (contentX + 50),
      y: contentY + 50
    }*/

    // Set the content position (same as svgWrapperPosition but with contentOffset more radius)
    // Calculate the offset radius

    /**
     * Must calculate the offset radius to get the correct position of the content box.
     * The size of the circle is in px and the contentOffset is in px.
     * But the position of the content box is in %.
     * So we need to calculate the offset radius in %.
     * The offset radius is the radius of the circle arc + the contentOffset.
     */
    const halfSize = (this.size + this.weight) / 2;
    const offsetRadius = (halfSize + this.contentOffset) / halfSize * 50;
    const contentX = Math.cos(arcCenterAngle * Math.PI / 180) * offsetRadius;
    const contentY = Math.sin(arcCenterAngle * Math.PI / 180) * offsetRadius;
    this.contentPosition = {
      x: 100 - (contentX + 50),
      y: contentY + 50
    }

    /** Set the content side class. */
    this.contentSide = arcCenterAngle > 90 && arcCenterAngle <= 270 ? 'right' : 'left';
  }

  /**
   * @inheritDoc
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if ('active' in changes) {
      this._animateWeight();
    }

    if ('maxWeight' in changes) {
      this.weightValue = this.active ? this.weight : 0;
    }

    if ('positionDegree' in changes || 'fillPercentage' in changes
      || 'torque' in changes  ||'contentOffset' in changes) {
      this._calculateStrokesPoints();
    }
  }

  private _animateWeight(): void {
    const from = this.active ? 0 : this.weight;
    const to = this.active ? this.weight : 0;
    animateValueUtil((value: number) => {
      this.weightValue = value;
    }, from, to, 300);
  }
}
