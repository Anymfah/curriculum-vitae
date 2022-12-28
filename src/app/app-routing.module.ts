import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageHomeComponent} from "./modules/main/components/page-home/page-home.component";
import {PageContactComponent} from "./modules/main/components/page-contact/page-contact.component";

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
    path: 'contact',
    component: PageContactComponent,
    data: {
      state: 'contact',
      menuItem: {
        label: 'Contact',
        index: 1
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
