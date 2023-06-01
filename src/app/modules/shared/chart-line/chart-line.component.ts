import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ChartLineCollection, ChartPoint} from './chart-line.interface';


interface Point {
  x: number;
  y: number;
}



@Component({
  selector: 'cv-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit, AfterViewInit, OnChanges, AfterViewInit {

  /**
   * Wrapper element
   */
  @ViewChild('wrapper', {static: true}) public wrapper!: ElementRef;

  /**
   * Collections of lines to be displayed in the chart.
   */
  @Input() public collections: ChartLineCollection[] = [];

  /**
   * X Zoom of the chart.
   */
  @Input() public zoomX = 1;

  /**
   * X Scroll position of the chart.
   */
  public xScrollPosition = 0;

  /**
   * Listen to mousewheel event.
   */
  @HostListener('wheel', ['$event']) onMouseWheelChrome(event: WheelEvent) {
    this._onScroll(event);
  }

  /**
   * Size of the chart wrapper.
   */
  public size = {
    x: 0,
    y: 0
  }

  /**
   * Wrapper Size
   */
  private _wrapperSize = {
    x: 0,
    y: 0
  }

  /**
   * Check if the chart is ready
   */
  private _isReady = false;

  /**
   * Max value of the chart.
   */
  private _maxValue = 0;

  /**
   * Min value of the chart.
   */
  private _minValue = 0;

  /**
   * Items of the chart.
   */
  public items: {x: number, y: number}[] = [];

  /**
   * Control points 1 of the chart. (debug)
   */
  public controlPoints1: Point[] = [];

  /**
   * Control points 2 of the chart. (debug)
   */
  public controlPoints2: Point[] = [];

  /**
   * SVG Path Curves of the chart.
   * One curve for each collection.
   */
  public curves: string[] = [];

  /**
   * @constructor
   * @param _ngZone NgZone reference.
   */
  public constructor(
    private _ngZone: NgZone
  ) {}

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
  }

  /**
   * @inheritDoc
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if ('collections' in changes) {
      this._draw();
    }

    if ('zoomX' in changes) {
      this._xZoom();
    }
  }

  /**
   * Draw the chart.
   */
  private _draw(): void {

    setTimeout(() => {
      this._ngZone.runOutsideAngular(() => {
        if (this._isReady) {
          this._calculateCollections();
        }
      });
    }, 0);
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    this._watchWrapperSize();
  }

  /**
   * Change X zoom of the chart.
   */
  private _xZoom(): void {
    console.log('changing zoom')
    this.size.x = this._wrapperSize.x * this.zoomX;
    //this._calculateCollections();
    this._draw();
  }

  /**
   * Calculate the values for the chart.
   */
  private _calculateCollections(): void {
    this._findMinMaxValues();
    const items:{x: number, y: number}[] = [];
    const curves: string[] = [];
    this.collections.forEach(collection => {
      const collectionItems: {x: number, y: number}[] = [];
      collection.values.forEach(value => {
        /**
         * values are based in percentage between min and max values
         * and the size of the wrapper.
         */
        const item = {
          x: (value.x - this._minValue) * this.size.x / (this._maxValue - this._minValue),
          y: (value.y - this._minValue) * this.size.y / (this._maxValue - this._minValue)
        }
        collectionItems.push(item);

      });
      curves.push(this._calculateCubicBezierCollection(collectionItems));
      items.push(...collectionItems);
    });
    this.items = items;
    this.curves = curves;
  }

  /**
   * Get the SVG Path Curve of the collection.
   * @description Draws a bezier curve between each item of the collection.
   *              Starts at the bottom left, ends at the bottom right.
   * @param collectionItems Items of the collection.
   * @returns SVG Path Curve.
   */
  private _calculateCubicBezierCollection(collectionItems: {x: number, y: number}[]): string {
    let curve = `M 0 ${this.size.y} `;
    const points: ChartPoint[] = this._catmullRomCurve(
      this._transformYValues(collectionItems)
    );

    points.forEach((point) => {
      curve += `C ${point.xc1} ${point.yc1} ${point.xc2} ${point.yc2} ${point.x} ${point.y} `;

      this.controlPoints1.push({
        x: point.xc1,
        y: point.yc1,
      });

      this.controlPoints2.push({
        x: point.xc2,
        y: point.yc2,
      });


    });

    curve += `L ${this.size.x} ${this.size.y} `;
    curve += `L 0 ${this.size.y} `;

    return curve;
  }

  /**
   * Transforms Y Values of the collectionItems to Y axis percentage.
   */
  private _transformYValues(collectionItems: {x: number, y: number}[]): {x: number, y: number}[] {
    return collectionItems.map(item => {
      return {
        x: item.x,
        y: this.size.y - item.y
      }
    });
  }

  /**
   * Calculate points of the curve using Catmull-Rom spline.
   * @param points Points of the curve.
   */
  private _catmullRomCurve(points: Point[] = []): ChartPoint[] {
    const curvePoints: ChartPoint[] = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || points[i + 1];

      /*const smoothness = 1;
      const xc1 = p1.x + (p2.x - p0.x) / 6 * smoothness;
      const yc1 = p1.y + (p2.y - p0.y) / 6 * smoothness;

      const xc2 = p2.x - (p3.x - p1.x) / 6 * smoothness;
      const yc2 = p2.y - (p3.y - p1.y) / 6 * smoothness;*/

      const distance = Math.sqrt(
        Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
      );
      const smoothness = Math.min(0.2, distance / 40);

      const t1x = (p2.x - p0.x) * smoothness;
      const t1y = (p2.y - p0.y) * smoothness;

      const t2x = (p3.x - p1.x) * smoothness;
      const t2y = (p3.y - p1.y) * smoothness;

      const xc1 = p1.x + t1x;
      const yc1 = p1.y + t1y;

      const xc2 = p2.x - t2x;
      const yc2 = p2.y - t2y;

      curvePoints.push({xc1, yc1, xc2, yc2, x: p2.x, y: p2.y});
    }

    return curvePoints;
  }

  /**
   * Find min and max values of the chart.
   */
  private _findMinMaxValues(): void {
    this.collections.forEach(collection => {
      collection.values.forEach(value => {
        if (value.y > this._maxValue) {
          this._maxValue = value.y;
        }
        if (value.y < this._minValue) {
          this._minValue = value.y;
        }
      });
    });
  }

  /**
   * Watch wrapper size
   */
  private _watchWrapperSize(): void {
    const observer = new ResizeObserver(() => {
      this.size.x = this.wrapper.nativeElement.offsetWidth * this.zoomX;
      this.size.y = this.wrapper.nativeElement.offsetHeight;

      this._wrapperSize.x = this.wrapper.nativeElement.offsetWidth;
      this._wrapperSize.y = this.wrapper.nativeElement.offsetHeight;
      this._isReady = true;
      this._draw();
    });
    observer.observe(this.wrapper.nativeElement);
  }

  /**
   * On Scroll in the chart.
   */
  private _onScroll(event: WheelEvent): void {
    const min = -(this.size.x - this._wrapperSize.x);
    const max = 0;
    const position = this.xScrollPosition - event.deltaY;
    if (position < min) {
      this.xScrollPosition = min;
    } else if (position > max) {
      this.xScrollPosition = max;
    } else {
      this.xScrollPosition = position;
    }
  }

  /**
   * Identify the item. (TrackBy)
   * @param index
   * @param item
   */
  public identify(index: number, item: {x: number, y: number}): number {
    return index;
  }
}
