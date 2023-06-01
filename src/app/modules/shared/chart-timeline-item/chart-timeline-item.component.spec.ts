import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTimelineItemComponent } from './chart-timeline-item.component';

describe('ChartTimelineItemComponent', () => {
  let component: ChartTimelineItemComponent;
  let fixture: ComponentFixture<ChartTimelineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTimelineItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
