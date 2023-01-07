import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import {LayoutComponent} from "./components/layout/layout.component";
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageContactComponent } from './components/page-contact/page-contact.component';
import {RouterLink, RouterModule} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import { HeaderComponent } from './components/header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import {CircleModule} from "../shared/circle/circle.module";
import {InputCircleSliderModule} from "../shared/input-circle-slider/input-circle-slider.module";
import {DrawCircleModule} from "../shared/draw-circle/draw-circle.module";
import { CircleMenuItemComponent } from './components/circle-menu-item/circle-menu-item.component';
import {PageWrapperModule} from "../shared/page-wrapper/page-wrapper.module";
import { BlockComponent } from './components/block/block.component';
import { ListComponent } from './components/list/list.component';



@NgModule({
    declarations: [
        MainComponent,
        LayoutComponent,
        PageHomeComponent,
        PageContactComponent,
        HeaderComponent,
        MenuComponent,
        ProfileComponent,
        CircleMenuItemComponent,
        BlockComponent,
        ListComponent,
    ],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    CircleModule,
    InputCircleSliderModule,
    DrawCircleModule,
    PageWrapperModule
  ],
  exports: [
    MainComponent,
    LayoutComponent
  ],
})
export class MainModule { }
