import {Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ListItem} from './list-item.interface';
import {DATA_TYPE} from '../../../../enums/data.enum';
import {EntityListService} from '../../../../services/entity-list.service';
import {EntityType} from '../../../../types/entity.type';
import {QueryInterface} from '../../../../interfaces/query.interface';
import {ThemePalette} from '@angular/material/core';
import {BehaviorSubject} from 'rxjs';
import {PRE_MADE_QUERY} from '../../../../enums/premade-query.enum';
import {BaseComponent} from '../../../shared/base/base.component';

@Component({
  selector: 'cv-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent extends BaseComponent implements OnChanges {
  public color: ThemePalette = 'primary';

  /**
   * The list items.
   */
  @Input() items?: ListItem[];

  /**
   * Entity items
   */
  @Input() entities?: EntityType[];

  /**
   * Items to render
   */
  public itemsToRender: ListItem[] = [];

  /**
   * Query for entities
   */
  @Input() queryArgs?: QueryInterface | PRE_MADE_QUERY;

  /**
   * Data type - Choose what to display
   */
  @Input() public entityType?: DATA_TYPE;

  /**
   * Key for value
   */
  @Input() public valueKey?: string;

  /**
   * Delay in ms for animation
   */
  @Input() public delay = 0;

  /**
   * Delay increment between items in ms
   */
  @Input() public delayIncrement = 150;

  /**
   * Delay for animation
   */
  private _getDelay(index: number): number {
    return this.delay + index * this.delayIncrement;
  }

  /**
   * Behavior subject for entities to render ready
   * (not used if {this.items} is set)
   */
  protected _entitiesReady = new BehaviorSubject<EntityType[]>([]);

  /**
   * Entities to work on
   */
  private _entities: EntityType[] = [];

  /**
   * @constructor
   * @param _entityListService Entity list service
   */
  public constructor(
    private readonly _entityListService: EntityListService,
  ) {
    super();
  }

  /**
   * @inheritDoc
   */
  public ngOnInit() {

  }

  /**
   * @inheritDoc
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if ('items' in changes ||
      'entities' in changes ||
      'queryArgs' in changes ||
      'entityType' in changes ||
      'valueKey' in changes) {
      this._renewItemsToRender();
    }
  }

  /**
   * Renew items to render
   */
  private _renewItemsToRender(): void {
    if (this.items != null && this.items.length > 0) {
      this._setItemsToRender(this.items);
    } else {
      if (this.entities != null && this.entities.length > 0) {
        this._entities = this.entities;
        this._entitiesReady.next(this._entities);
      } else {
        this._getEntities();
      }
      this.itemsToRender = this._getItemsToRender();
    }
  }

  /**
   * Get entities from service
   */
  private _getEntities(): void {
    if (this.entityType != null) {
      if (typeof this.queryArgs === 'string') {
        this._entities = this._entityListService
          .getPreMadeQuery(this.entityType, this.queryArgs)
      } else {
        this._entities = this._entityListService
          .getFilteredCollection(this.entityType, this.queryArgs);
      }
      this._entitiesReady.next(this._entities);
    }
  }

  /**
   * Get items to render as List Items
   */
  private _getItemsToRender(): ListItem[] {
    const itemsToRender: ListItem[] = [];
    this._entities.forEach((entity: EntityType, key: number) => {
      itemsToRender.push(this._entityToItem(entity, key));
    });
    return itemsToRender;
  }

  /**
   * EntityType to ListItem
   */
  private _entityToItem(entity: EntityType, key: number): ListItem {
    return {
      id: entity.id,
      title: entity.name,
      subtitle: entity.subtitle,
      icon: entity.icon,
      value: this._getValueFromEntity(entity) ?? 0,
      color: entity.color,
      delay: this._getDelay(key),
    };
  }

  /**
   * Get Value from entity with given key
   */
  protected _getValueFromEntity(entity: EntityType): number | null {
    if (this.valueKey != null) {
      const entityT = entity as any; //TODO: Fix this
      return entityT[this.valueKey];
    } else {
      return null;
    }
  }

  /**
   * Set items to render
   */
  protected _setItemsToRender(items: ListItem[]): void {
    this.itemsToRender = items;
  }
}
