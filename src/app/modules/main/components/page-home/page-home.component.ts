import {Component, HostBinding, OnInit} from '@angular/core';
import {EntityListService} from '../../../../services/entity-list.service';

@Component({
  selector: 'cv-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

  @HostBinding('class.cv-page') public readonly cvPageClass = true;

  constructor(
    private readonly _entityListService: EntityListService,
  ) {
  }

  public ngOnInit(): void {

  }


}
