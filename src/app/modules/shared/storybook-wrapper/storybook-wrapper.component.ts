import {Component, Input} from '@angular/core';

@Component({
  selector: 'cv-storybook-wrapper',
  templateUrl: './storybook-wrapper.component.html',
  styleUrls: ['./storybook-wrapper.component.scss']
})
export class StorybookWrapperComponent {
  @Input() public width?: string = '100%';
  @Input() public height?: string = '100%';
  @Input() public padding?: string = '0';
}
