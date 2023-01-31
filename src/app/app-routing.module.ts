import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageHomeComponent} from "./modules/main/components/page-home/page-home.component";
import {PageContactComponent} from "./modules/main/components/page-contact/page-contact.component";
import {PageSkillsComponent} from './modules/main/components/page-skills/page-skills.component';
import {PageWorksComponent} from './modules/main/components/page-works/page-works.component';
import {PageEducationComponent} from './modules/main/components/page-education/page-education.component';

const routes: Routes = [
  {
    path: '',
    component: PageHomeComponent,
    data: {
      state: 'home',
      menuItem: {
        label: 'Soheil Saheb-Jamii',
        index: 0
      }
    }
  },
  {
    path: 'skills',
    component: PageSkillsComponent,
    data: {
      state: 'skills',
      menuItem: {
        label: 'Compétences',
        index: 1
      }
    }
  },
  {
    path: 'works',
    component: PageWorksComponent,
    data: {
      state: 'works',
      menuItem: {
        label: 'Expériences',
        index: 2
      }
    }
  },
  {
    path: 'education',
    component: PageEducationComponent,
    data: {
      state: 'education',
      menuItem: {
        label: 'Formations',
        index: 3
      }
    }
  },
  {
    path: 'contact',
    component: PageContactComponent,
    data: {
      state: 'contact',
      menuItem: {
        label: 'Contact',
        index: 4
      }
    }
  },
  {
    path: '**',
    redirectTo: '',
  }
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
