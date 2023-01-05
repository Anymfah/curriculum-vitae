import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'cv-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent {

  @HostBinding('class.cv-page') public readonly cvPageClass = true;

}
