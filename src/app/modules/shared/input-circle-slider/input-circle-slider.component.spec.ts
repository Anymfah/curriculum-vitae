import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCircleSliderComponent } from './input-circle-slider.component';

describe('InputCircleSliderComponent', () => {
  let component: InputCircleSliderComponent;
  let fixture: ComponentFixture<InputCircleSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCircleSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCircleSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
