import {Component, Input} from '@angular/core';

@Component({
  selector: 'cv-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {
  /**
   * Title of the block
   */
  @Input() public title = '';

  /**
   * Max height of the block
   */
  @Input() public maxHeight?: string = '100%';
}