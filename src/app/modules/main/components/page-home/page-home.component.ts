import {Component, HostBinding, OnInit} from '@angular/core';
import {EntityListService} from '../../../../services/entity-list.service';
import {DATA_FIELD, ORDER_FIELD} from '../../../../enums/data.enum';
import {QueryInterface} from '../../../../interfaces/query.interface';

@Component({
  selector: 'cv-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

  @HostBinding('class.cv-page') public readonly cvPageClass = true;

  /**
   * Blocks data
   */
  public blocks = {
    favoriteStacks: {
      title: 'Mes Stacks préférées',
      valueKey: DATA_FIELD.EXPERIENCE,
      queryArgs: {
        limit: 5,
        filters: [
          {name: DATA_FIELD.FAVORITE, value: true},
          {name: DATA_FIELD.HAPPINESS, value: 100},
        ],
        orderBy: [{name: ORDER_FIELD.HAPPINESS}],
      } as QueryInterface,
    }
  };

  /**
   * @constructor
   * @param _entityListService
   */
  constructor(
    private readonly _entityListService: EntityListService,
  ) {
  }

  public ngOnInit(): void {

  }


}
