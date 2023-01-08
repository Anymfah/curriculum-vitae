import {Component, Input, OnInit} from '@angular/core';
import {ListItem} from './list-item.interface';
import {DATA_TYPE} from '../../../../enums/data.enum';
import {EntityListService} from '../../../../services/entity-list.service';
import {EntityType} from '../../../../types/entity.type';

@Component({
  selector: 'cv-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  /**
   * The list items.
   */
  @Input() items: ListItem[] = [];

  /**
   * Items to render
   */
  public itemsToRender: ListItem[] = [];

  /**
   * Number of items
   */
  @Input() public numberOfItems: number = 5;

  /**
   * Data type - Choose what to display
   */
  @Input() public entityType: DATA_TYPE = DATA_TYPE.SKILL;

  /**
   * Order entities by
   */
  @Input() public orderBy:
    'name' | 'date' | 'level' | 'happiness' | 'experience' = 'name';

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
  }

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this._getEntities();
    this.itemsToRender = this._getItemsToRender();
  }

  /**
   * Get entities from service
   */
  private _getEntities() {
    this._entities = this._entityListService.getCollectionByType(this.entityType);
  }

  /**
   * Get items to render as List Items
   */
  private _getItemsToRender(): ListItem[] {
    const itemsToRender: ListItem[] = [];
    this._entities.forEach((entity: EntityType) => {

    });
    return itemsToRender;
  }
}
