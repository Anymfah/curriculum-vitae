import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {
  CdkConnectedOverlay,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {TOOLTIP_POSITION} from './tooltip.enum';
import {CONNECTED_POSITIONS, CONNECTED_POSITIONS_LIST} from '../../../constants/position-strategy.constant';

@Component({
  selector: 'cv-tooltip',
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements AfterViewInit {

  /**
   * Template Reference to the content of the tooltip.
   */
  @ViewChild(TemplateRef) public content?: TemplateRef<any>;

  /**
   * Portal for the tooltip content.
   */
  private _portal?: TemplatePortal<any>;

  /**
   * Overlay reference.
   */
  private _overlayRef?: OverlayRef;

  /**
   * OverlayOrigin
   */
  public overlayOrigin?: ElementRef;

  /**
   * Position Strategy
   */
  private _positionStrategy?:  FlexibleConnectedPositionStrategy;

  /**
   * Overlay
   */
  @ViewChild(CdkConnectedOverlay) public overlay?: CdkConnectedOverlay;

  /**
   * Connected Position
   */
  public connectedPositions: ConnectedPosition[] = [];

  /**
   * Position Strategy
   */
  @Input() public cvTooltipPosition: TOOLTIP_POSITION = TOOLTIP_POSITION.TOP;

  /**
   * Current position of the tooltip.
   */
  public currentPosition: TOOLTIP_POSITION = TOOLTIP_POSITION.TOP;

  /**
   * Tooltip active state.
   */
  public active = false;

  /**
   * PathLine
   */
  public pathLine = '';

  public originPosition?: {x: number, y: number};

  /**
   * Tooltip header
   */
  @Input() public cvTooltip = '';

  /**
   * @constructor
   */
  public constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
  ) {
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    this._setPositionStrategy();
    this.open();
  }

  /**
   * PathLine num to String
   */
  public getPathLine = {
    moveTo: (x: number, y: number) => {
      return `M ${x} ${y}`;
    },
    lineTo: (x: number, y: number) => {
      return `L ${x} ${y}`;
    },
    hTo: (x: number) => {
      return `H ${x}`;
    }
  }

  /**
   * Draw PathLine
   * @see currentPosition
   */
  private _drawPathLine(): void {
    switch (this.currentPosition) {
      case TOOLTIP_POSITION.TOP:
        this.pathLine = `M 20 30 L 0 15 V 0`;
        break;
      case TOOLTIP_POSITION.TOP_LEFT:
        this.pathLine = `M 50 30 H 30 L 0 0`;
        break;
      case TOOLTIP_POSITION.TOP_RIGHT:
        this.pathLine = `M 0 30 H 20 L 50 0`;
        break;
      case TOOLTIP_POSITION.RIGHT:
        this.pathLine = `M 0 15 L 20 0 H 50`;
        break;
      case TOOLTIP_POSITION.LEFT:
        this.pathLine = `M 50 15 L 30 0 H 0`;
        break;
      case TOOLTIP_POSITION.BOTTOM:
        this.pathLine = `M 20 0 L 0 15 V 30`;
        break;
      case TOOLTIP_POSITION.BOTTOM_LEFT:
        this.pathLine = `M 50 0 H 30 L 0 30`;
        break;
      case TOOLTIP_POSITION.BOTTOM_RIGHT:
        this.pathLine = `M 0 0 H 20 L 50 30`;
        break;
    }
  }

  /**
   * Destroy tooltip component.
   */
  public destroy(): Promise<void> {
    return new Promise((resolve) => {
      this.close().then(() => {
        this._portal = undefined;
        resolve();
      });
    });
  }

  /**
   * Set position strategy.
   */
  private _setPositionStrategy(): void {
    const positions = [];
    /**
     * Fill positions array with all possible positions
     * with this.cvTooltipPosition as the primary position.
     */
    for (const position of CONNECTED_POSITIONS_LIST) {
      if (position === this.cvTooltipPosition) {
        positions.unshift(CONNECTED_POSITIONS[position]);
      } else {
        positions.push(CONNECTED_POSITIONS[position]);
      }
    }

    this.connectedPositions = positions;
    if (this.overlayOrigin != null && this.originPosition == null) {
      this._positionStrategy = this._overlay.position()
        .flexibleConnectedTo(this.overlayOrigin)
        .withPositions(this.connectedPositions);
    } else if (this.originPosition != null) {
      this._positionStrategy = this._overlay.position()
        .flexibleConnectedTo(this.originPosition)
        .withPositions(this.connectedPositions);
    }

    if (this._positionStrategy != null) {
      const sub = this._positionStrategy.positionChanges.subscribe((position) => {
        /**
         * Get the TOOLTIP_POSITION keyname from current position
         */
        const getMatchingPosition = Object.keys(CONNECTED_POSITIONS).find((key) => {
          const pos = CONNECTED_POSITIONS[key];
          return pos.originX === position.connectionPair.originX &&
            pos.originY === position.connectionPair.originY &&
            pos.overlayX === position.connectionPair.overlayX &&
            pos.overlayY === position.connectionPair.overlayY;
        });
        this.currentPosition = getMatchingPosition as TOOLTIP_POSITION;
        this._drawPathLine();
        sub.unsubscribe();
      });
    }
  }

  /**
   * @method open Open the tooltip.
   */
  public open() {
    if (!this._overlayRef && this.overlayOrigin != null && this.content != null) {
      this._overlayRef = this._overlay.create({
        positionStrategy : this._positionStrategy,
      });

      // Add class
      this._overlayRef.overlayElement.classList.add('pointer-events-none');
      this._portal = new TemplatePortal(this.content, this._viewContainerRef);
      this._overlayRef.attach(this._portal);

      setTimeout(() => {
        this.active = true;
      }, 1);
    }
  }

  /**
   * @method close Close the tooltip.
   * @returns {Promise<void>}
   */
  public close(): Promise<void> {
    return new Promise((resolve) => {
      this.active = false;
      setTimeout(() => {
        if (this._overlayRef) {
          this._overlayRef.detach();
          this._overlayRef.dispose();
          this._overlayRef = undefined;
        }
        resolve();
      }, 500);

    });
  }
}
