import {Directive, HostListener, Input} from '@angular/core';
import {EntityListService} from '../../../services/entity-list.service';
import {EntityType} from '../../../types/entity.type';

@Directive({
  selector: '[cvSelectEntity]'
})
export class SelectEntityDirective {

  /**
   * Entity to focus
   */
  @Input() public cvSelectEntity: number | EntityType | undefined;

  @HostListener('click', ['$event']) public onClick(event: MouseEvent): void {
    this._entityListService.focusEntity(this.cvSelectEntity);
  }

  /**
   * @constructor
   * @param _entityListService Entity list service
   */
  public constructor(
    private readonly _entityListService: EntityListService,
  ) {}

}
