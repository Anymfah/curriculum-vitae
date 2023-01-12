import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChartCirclesComponent } from './list-chart-circles.component';

describe('ListChartCirclesComponent', () => {
  let component: ListChartCirclesComponent;
  let fixture: ComponentFixture<ListChartCirclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChartCirclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChartCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
