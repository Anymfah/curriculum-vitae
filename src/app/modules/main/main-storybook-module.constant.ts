import {CommonModule} from '@angular/common';
import {MainComponent} from './components/main/main.component';
import {LayoutComponent} from "./components/layout/layout.component";
import {PageHomeComponent} from './components/page-home/page-home.component';
import {PageContactComponent} from './components/page-contact/page-contact.component';
import {RouterLink, RouterModule} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {appRouting} from "../../app-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {ProfileComponent} from "./components/profile/profile.component";
import {CircleModule} from "../shared/circle/circle.module";
import {InputCircleSliderModule} from "../shared/input-circle-slider/input-circle-slider.module";
import {MenuComponent} from "./components/menu/menu.component";
import {DrawCircleModule} from "../shared/draw-circle/draw-circle.module";
import {StorybookWrapperModule} from "../shared/storybook-wrapper/storybook-wrapper.module";
import {CircleMenuItemComponent} from "./components/circle-menu-item/circle-menu-item.component";
import {PageWrapperModule} from "../shared/page-wrapper/page-wrapper.module";
import {BlockComponent} from "./components/block/block.component";
import {ListComponent} from './components/list/list.component';
import {MatListModule} from '@angular/material/list';
import {SvgIconModule} from '../shared/svg-icon/svg-icon.module';
import {ChartGaugeModule} from '../shared/chart-gauge/chart-gauge.module';
import {ListChartCirclesComponent} from './components/list-chart-circles/list-chart-circles.component';
import {ChartCircleModule} from '../shared/chart-circle/chart-circle.module';
import {ListChartDonutComponent} from './components/list-chart-donut/list-chart-donut.component';
import {ChartDonutModule} from '../shared/chart-donut/chart-donut.module';
import {MatRippleModule} from '@angular/material/core';
import {ActiveSwitchModule} from '../shared/active-switch/active-switch.module';
import {ListChartGaugeComponent} from './components/list-chart-gauge/list-chart-gauge.component';
import {DataDetailsComponent} from './components/data-details/data-details.component';
import {SelectEntityModule} from '../shared/select-entity/select-entity.module';
import {PageSkillsComponent} from './components/page-skills/page-skills.component';


export const MainStorybookModuleConstant ={
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
    ListChartCirclesComponent,
    ListChartDonutComponent,
    ListChartGaugeComponent,
    DataDetailsComponent,
    PageSkillsComponent
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
    DrawCircleModule,
    StorybookWrapperModule,
    PageWrapperModule,
    MatListModule,
    SvgIconModule,
    ChartGaugeModule,
    ChartCircleModule,
    ChartDonutModule,
    MatRippleModule,
    ActiveSwitchModule,
    SelectEntityModule,
  ],
  exports: [
    MainComponent,
    LayoutComponent,
    HeaderComponent,
    ProfileComponent,
    CircleMenuItemComponent,
    BlockComponent,
    ListComponent,
    ListChartCirclesComponent,
    ListChartDonutComponent,
    ListChartGaugeComponent,
    DataDetailsComponent,
    PageSkillsComponent
  ],
};
