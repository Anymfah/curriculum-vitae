import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSkillsComponent } from './page-skills.component';

describe('PageSkillsComponent', () => {
  let component: PageSkillsComponent;
  let fixture: ComponentFixture<PageSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
