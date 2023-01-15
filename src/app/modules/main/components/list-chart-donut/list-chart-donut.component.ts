import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../list/list.component';
import {ChartDonutPart} from '../../../shared/chart-donut/chart-donut.interface';
import {EntityType} from '../../../../types/entity.type';
import {ListItem} from '../list/list-item.interface';

@Component({
  selector: 'cv-list-chart-donut',
  templateUrl: './list-chart-donut.component.html',
  styleUrls: ['./list-chart-donut.component.scss']
})
export class ListChartDonutComponent extends ListComponent implements OnInit {

  /**
   * Values data for the chart.
   */
  public chartValues: ChartDonutPart[] = [];

  /**
   * @inheritDoc
   */
  override ngOnInit() {
    super.ngOnInit();

    /** Wait entities to be ready - Will run only if items not specified */
    if (this.items == null) {
      this._entitiesReady.subscribe((items: EntityType[]) => {
        this.chartValues = this._itemsToChartDonut(items);
      });
    }
  }

  /**
   * Items to chart donut
   * @param items
   */
  private _itemsToChartDonut(items: EntityType[]): ChartDonutPart[] {
    return items.map((item: EntityType) => {
      return {
        value: this._getValueFromEntity(item) ?? 0,
        name: item.name,
        color: item.color
      };
    });
  }

  protected override _setItemsToRender(items: ListItem[]): void {
    this.itemsToRender = items;
    this.chartValues = items.map((item: ListItem) => {
      return {
        value: item.value, //item.value / total * 360,
        name: item.title,
        color: item.color
      };
    });
  }
}
