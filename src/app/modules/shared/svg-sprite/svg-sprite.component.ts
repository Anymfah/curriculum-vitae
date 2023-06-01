import {Component, OnInit} from '@angular/core';
import {SvgSpriteService} from './svg-sprite.service';
import {SvgIconInterface} from '../svg-icon/svg-icon.interface';
import {BaseComponent} from '../base/base.component';

@Component({
  selector: 'cv-svg-sprite',
  templateUrl: './svg-sprite.component.html',
  styleUrls: ['./svg-sprite.component.scss']
})
export class SvgSpriteComponent extends BaseComponent implements OnInit {

  public icons: SvgIconInterface[] = [];

  /**
   * @constructor
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
    this._subscribe(this._svgSpriteService.icons$,
      (icons: SvgIconInterface[]) => {
        this.icons = icons;
      });
  }
}
