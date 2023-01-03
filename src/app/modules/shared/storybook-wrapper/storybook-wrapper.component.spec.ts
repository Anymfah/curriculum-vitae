import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorybookWrapperComponent } from './storybook-wrapper.component';

describe('StorybookWrapperComponent', () => {
  let component: StorybookWrapperComponent;
  let fixture: ComponentFixture<StorybookWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorybookWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorybookWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
