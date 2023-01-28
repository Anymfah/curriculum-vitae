import {Component, HostBinding, OnInit} from '@angular/core';
import {EntityListService} from '../../../../services/entity-list.service';
import {DATA_FIELD, DATA_TYPE} from '../../../../enums/data.enum';
import {PRE_MADE_QUERY} from '../../../../enums/premade-query.enum';
import {SkillEntity} from '../../../../models/skill-entity.model';

@Component({
  selector: 'cv-page-skills',
  templateUrl: './page-skills.component.html',
  styleUrls: ['./page-skills.component.scss']
})
export class PageSkillsComponent implements OnInit {

  @HostBinding('class.cv-page') public readonly cvPageClass = true;

  /**
   * Best skills to display
   */
  public bestSkills: SkillEntity[] = [];

  /**
   * All stacks to display
   */
  public allStackList = {
    valueKey: DATA_FIELD.LEVEL,
    type: DATA_TYPE.SKILL,
    query: PRE_MADE_QUERY.ALL_STACKS
  }

  /**
   * Others skills to display
   */
  public othersList = {
    valueKey: DATA_FIELD.LEVEL,
    type: DATA_TYPE.SKILL,
    query: PRE_MADE_QUERY.OTHERS_SKILLS
  }

  /**
   * @constructor
   * @param _entityListService Entity list service
   */
  public constructor(
    private readonly _entityListService: EntityListService,
  ) {
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this._requestBestSkills()
  }

  /**
   * Request best skills
   */
  private _requestBestSkills(): void {
    this.bestSkills = this._entityListService.getPreMadeQuery(
      DATA_TYPE.SKILL, PRE_MADE_QUERY.STACKS_BEST_FAVORITES
    ) as SkillEntity[];
  }

}
