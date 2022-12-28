import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawCircleComponent } from './draw-circle.component';

describe('DrawCircleComponent', () => {
  let component: DrawCircleComponent;
  let fixture: ComponentFixture<DrawCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawCircleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
