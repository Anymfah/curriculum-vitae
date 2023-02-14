import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {EntityType} from '../../../../types/entity.type';
import {SkillEntity} from '../../../../models/skill-entity.model';
import {WorkEntity} from '../../../../models/work-entity.model';
import {DATA_FIELD, DATA_TYPE} from '../../../../enums/data.enum';
import {ValueSkillEntitiesToList} from '../../../../transformers/entity-list.transformer';
import {ListItem} from '../list/list-item.interface';
import {EntityListService} from '../../../../services/entity-list.service';
import {ProjectEntity} from '../../../../models/project-entity.model';
import {BaseComponent} from '../../../shared/base/base.component';

type ChartEntityList = {
  entityType?: DATA_TYPE;
  entities?: EntityType[];
  valueKey?: DATA_FIELD;
  items?: ListItem[];
}

@Component({
  selector: 'cv-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.scss']
})
export class DataDetailsComponent extends BaseComponent implements OnChanges, OnInit, OnDestroy {

  /**
   * Entity to be displayed.
   */
  @Input() public entity?: EntityType;

  /** History entities. */
  private _historyEntities: EntityType[] = [];

  /** Get last history entity. */
  public lastHistoryEntity: EntityType | undefined;

  /** Name of the entity. */
  public entityName: string = '';

  /** Subtitle of the entity. */
  public entitySubtitle: string = '';

  /** Side entities as gauge charts. */
  public gaugeCharts?: ChartEntityList;

  /** Donut chart entities. */
  public donutChart?: ChartEntityList;

  /** Circle charts delay. */
  private _circleDelay = 0;

  /** Global delay increment */
  private _delayIncrement = 150;

  /**
   * Circle charts to show
   */
  public circleCharts: Array<{ label: string, value: number, delay: number }> = [];

  /**
   * @constructor
   */
  public constructor(
    private readonly _entityListService: EntityListService
  ) {
    super();
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    if (this.entity == null) {
      this._subscribe(this._entityListService.focused$,
        (entity: EntityType | undefined) => {
          this.entity = entity;
          this._updateEntity();
          this._updateCircleCharts();
          this._updateEntityLists();
          this._insertEntityToHistory();
          this._setLastHistoryEntity();
        });
    }
  }

  /**
   * @inheritDoc
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if ('entity' in changes) {
      this._updateEntity();
      this._updateCircleCharts();
      this._updateEntityLists();
      this._insertEntityToHistory();
      this._setLastHistoryEntity();
    }
  }

  /**
   * Update entity.
   */
  private _updateEntity(): void {
    this.entityName = this.entity?.name ?? '';
    this.entitySubtitle = this.entity?.subtitle ?? '';
  }

  /**
   * Insert Entity to history.
   */
  private _insertEntityToHistory(): void {
    if (this.entity != null) {
      this._historyEntities.push(this.entity);
    }
  }

  /**
   * Set last history entity.
   */
  private _setLastHistoryEntity(): void {
    if (this._historyEntities.length > 1) {
      this.lastHistoryEntity = this._historyEntities[this._historyEntities.length - 2];
    } else {
      this.lastHistoryEntity = undefined;
    }
  }

  /**
   * Update circle charts.
   */
  private _updateCircleCharts(): void {
    this.circleCharts = [];
    this._circleDelay = 0;
    if (this.entity instanceof SkillEntity) {
      this._circleChartsSkillEntity(this.entity);
    }


    if (this.entity != null) {
      /** Add Happiness chart */
      this.circleCharts.push({
        label: 'Ma satisfaction',
        value: this.entity.happiness,
        delay: this._circleDelay
      });
      this._incrementCircleDelay();
    }
  }

  /**
   * Update circle chart for SkillEntity.
   */
  private _circleChartsSkillEntity(entity: SkillEntity): void {
    /** Add Level chart */
    this.circleCharts.push({
      label: 'Mon niveau',
      value: entity.level,
      delay: this._circleDelay
    });
    this._incrementCircleDelay();
    /** Add Experience chart */
    this.circleCharts.push({
      label: 'Mon expérience globale',
      value: entity.experience,
      delay: this._circleDelay
    });
    this._incrementCircleDelay();
  }

  /**
   * Update gauge charts.
   */
  private _updateEntityLists(): void {
    this.gaugeCharts = undefined;
    this.donutChart = undefined;

    if (this.entity instanceof WorkEntity) {
      this.gaugeCharts = {
        entityType: DATA_TYPE.PROJECT,
        entities: this.entity.projects,
        valueKey: DATA_FIELD.HAPPINESS
      };
      this.donutChart = {
        items: ValueSkillEntitiesToList(this.entity.skillRatios)
      };
    } else if (this.entity instanceof ProjectEntity) {
      this.gaugeCharts = {
        entityType: DATA_TYPE.SKILL,
        entities: this.entity.skills,
        valueKey: DATA_FIELD.LEVEL
      };
      this.donutChart = {
        // TODO: continue here (maybe something else than donut chart)
      }
    }
  }

  /**
   * Increment circle delay.
   */
  private _incrementCircleDelay(): void {
    this._circleDelay += this._delayIncrement;
  }

  /**
   * Close the details block.
   */
  public close(): void {
    this._historyEntities = [];
    this.entity = undefined;
  }

  /**
   * Go back to the previous entity.
   */
  public goBack(): void {
    this.entity = this.lastHistoryEntity;
    this._historyEntities.pop();
    this._updateEntity();
    this._updateCircleCharts();
    this._updateEntityLists();
    this._setLastHistoryEntity();
  }
}
