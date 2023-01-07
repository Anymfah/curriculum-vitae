import {Component, Input} from '@angular/core';

/**
 * @TODO Work in progress
 */
@Component({
  selector: 'cv-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  /**
   * Number of columns.
   */
  @Input() public columns: number = 1;

  /**
   * Number of rows.
   */
  @Input() public rows: number = 1;

  /**
   * Gap between columns and rows.
   */
  @Input() public gap: number = 0;
}
