import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChartGaugeComponent } from './list-chart-gauge.component';

describe('ListChartGaugeComponent', () => {
  let component: ListChartGaugeComponent;
  let fixture: ComponentFixture<ListChartGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChartGaugeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChartGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
