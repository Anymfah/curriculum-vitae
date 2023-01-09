import {Component, OnInit} from '@angular/core';
import {SvgSpriteService} from './svg-sprite.service';
import {SvgIconInterface} from '../svg-icon/svg-icon.interface';

@Component({
  selector: 'cv-svg-sprite',
  templateUrl: './svg-sprite.component.html',
  styleUrls: ['./svg-sprite.component.scss']
})
export class SvgSpriteComponent implements OnInit {

  public icons: SvgIconInterface[] = [];

  /**
   * @constructor
   */
  public constructor(
    private readonly _svgSpriteService: SvgSpriteService
  ) {}

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this._svgSpriteService.icons$.subscribe((icons) => {
      this.icons = icons;
    });
  }
}
