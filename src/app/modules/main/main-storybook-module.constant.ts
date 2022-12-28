import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import {LayoutComponent} from "./components/layout/layout.component";
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageContactComponent } from './components/page-contact/page-contact.component';
import {RouterLink, RouterModule} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import { HeaderComponent } from './components/header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {appRouting} from "../../app-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {ProfileComponent} from "./components/profile/profile.component";
import {CircleModule} from "../shared/circle/circle.module";
import {InputCircleSliderModule} from "../shared/input-circle-slider/input-circle-slider.module";



export const MainStorybookModuleConstant ={
  declarations: [
      MainComponent,
      LayoutComponent,
      PageHomeComponent,
      PageContactComponent,
      HeaderComponent,
      ProfileComponent
  ],
  imports: [
    appRouting,
    BrowserAnimationsModule,
    CircleModule,
    CommonModule,
    RouterLink,
    RouterModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    InputCircleSliderModule,
  ],
  exports: [
    MainComponent,
    LayoutComponent,
    HeaderComponent,
    ProfileComponent
  ],
};
