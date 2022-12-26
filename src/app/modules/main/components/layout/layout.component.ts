import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cv-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];

  public constructor() { }

  public ngOnInit(): void {
  }

}
