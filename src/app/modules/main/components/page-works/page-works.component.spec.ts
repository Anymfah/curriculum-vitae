import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWorksComponent } from './page-works.component';

describe('PageWorksComponent', () => {
  let component: PageWorksComponent;
  let fixture: ComponentFixture<PageWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWorksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
