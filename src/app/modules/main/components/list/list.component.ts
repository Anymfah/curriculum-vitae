import {Component, Input, OnInit} from '@angular/core';
import {ListItem} from './list-item.interface';

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

  public ngOnInit() {
  }
}
