import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEducationComponent } from './page-education.component';

describe('PageEducationComponent', () => {
  let component: PageEducationComponent;
  let fixture: ComponentFixture<PageEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
