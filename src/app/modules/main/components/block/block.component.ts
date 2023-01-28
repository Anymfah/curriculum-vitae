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
  @Input() public cvTitle = '';

  /**
   * Max height of the block
   */
  @Input() public maxHeight?: string = '100%';

  /**
   * Disable padding
   */
  @Input() public disablePadding?: boolean = false;

  /**
   * Centered content
   */
  @Input() public centered?: boolean = false;

  /**
   * Column content
   */
  @Input() public column?: boolean = false;
}
