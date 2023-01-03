import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleMenuItemComponent } from './circle-menu-item.component';

describe('CircleMenuItemComponent', () => {
  let component: CircleMenuItemComponent;
  let fixture: ComponentFixture<CircleMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
