import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../list/list.component';

@Component({
  selector: 'cv-list-timeline',
  templateUrl: './list-timeline.component.html',
  styleUrls: ['./list-timeline.component.scss']
})
export class ListTimelineComponent extends ListComponent implements OnInit{

  /**
   * @inheritDoc
   */
  public override ngOnInit() {
    super.ngOnInit();
  }

}
