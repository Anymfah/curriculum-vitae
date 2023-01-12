import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChartDonutComponent } from './list-chart-donut.component';

describe('ListChartDonutComponent', () => {
  let component: ListChartDonutComponent;
  let fixture: ComponentFixture<ListChartDonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChartDonutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChartDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
