import {Component, HostBinding, OnInit} from '@angular/core';
import {EntityListService} from '../../../../services/entity-list.service';
import {DATA_FIELD, DATA_TYPE} from '../../../../enums/data.enum';
import {PRE_MADE_QUERY} from '../../../../enums/premade-query.enum';

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
      query: PRE_MADE_QUERY.STACKS_BEST_FAVORITES
    },
    lastProjects: {
      title: 'Mes derniers projets',
      valueKey: DATA_FIELD.HAPPINESS,
      type: DATA_TYPE.PROJECT,
      query: PRE_MADE_QUERY.LAST_PROJECTS
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
