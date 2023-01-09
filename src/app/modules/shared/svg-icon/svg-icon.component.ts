import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SvgSpriteService} from '../svg-sprite/svg-sprite.service';
import {SvgIconInterface} from './svg-icon.interface';

@Component({
  selector: 'cv-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit, OnChanges {

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
  ) {}

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
      const sub = this._svgSpriteService.load(this.icon)
        .subscribe((svgIcon) => {
          if (svgIcon != null) {
            this.svgIcon = svgIcon;
            sub.unsubscribe();
          }
        });
    }
  }
}
