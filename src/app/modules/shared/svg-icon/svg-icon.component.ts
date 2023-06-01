import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SvgSpriteService} from '../svg-sprite/svg-sprite.service';
import {SvgIconInterface} from './svg-icon.interface';
import {BaseComponent} from '../base/base.component';

@Component({
  selector: 'cv-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent extends BaseComponent implements OnInit, OnChanges {

  /**
   * Self class
   */
  @HostBinding('class') public readonly selfClass = 'cv-svg-icon';

  /**
   * svg icon name
   */
  @Input() public icon?: string;

  /**
   * Icon
   */
  public svgIcon?: SvgIconInterface;

  /**
   * @constructor
   * @param _svgSpriteService SVG Sprite Service
   */
  public constructor(
    private readonly _svgSpriteService: SvgSpriteService
  ) {
    super();
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this._getSvgIcon();
  }

  /**
   * @inheritDoc
   * @param changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if ('icon' in changes && this.icon != null) {
      this._getSvgIcon();
    }
  }

  /**
   * @method Get SVG Icon
   */
  private _getSvgIcon(): void {
    if (this.icon != null) {
      this._subscribe(this._svgSpriteService.load(this.icon),
        (svgIcon: SvgIconInterface) => {
          if (svgIcon != null) {
            this.svgIcon = svgIcon;
          }
        });
    }
  }
}
