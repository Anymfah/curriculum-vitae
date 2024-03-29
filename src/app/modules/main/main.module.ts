import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './components/main/main.component';
import {LayoutComponent} from "./components/layout/layout.component";
import {PageHomeComponent} from './components/page-home/page-home.component';
import {PageContactComponent} from './components/page-contact/page-contact.component';
import {RouterLink, RouterModule} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {HeaderComponent} from './components/header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MenuComponent} from './components/menu/menu.component';
import {ProfileComponent} from './components/profile/profile.component';
import {CircleModule} from "../shared/circle/circle.module";
import {InputCircleSliderModule} from "../shared/input-circle-slider/input-circle-slider.module";
import {DrawCircleModule} from "../shared/draw-circle/draw-circle.module";
import {CircleMenuItemComponent} from './components/circle-menu-item/circle-menu-item.component';
import {PageWrapperModule} from "../shared/page-wrapper/page-wrapper.module";
import {BlockComponent} from './components/block/block.component';
import {ListComponent} from './components/list/list.component';
import {MatListModule} from '@angular/material/list';
import {SvgIconModule} from '../shared/svg-icon/svg-icon.module';
import {ChartGaugeModule} from '../shared/chart-gauge/chart-gauge.module';
import {ChartCircleModule} from '../shared/chart-circle/chart-circle.module';
import {ListChartCirclesComponent} from './components/list-chart-circles/list-chart-circles.component';
import {ListChartDonutComponent} from './components/list-chart-donut/list-chart-donut.component';
import {ChartDonutModule} from '../shared/chart-donut/chart-donut.module';
import {MatRippleModule} from '@angular/material/core';
import {ActiveSwitchModule} from '../shared/active-switch/active-switch.module';
import {ListChartGaugeComponent} from './components/list-chart-gauge/list-chart-gauge.component';
import {DataDetailsComponent} from './components/data-details/data-details.component';
import {SelectEntityModule} from '../shared/select-entity/select-entity.module';
import {PageSkillsComponent} from './components/page-skills/page-skills.component';
import {PageEducationComponent} from './components/page-education/page-education.component';
import {PageWorksComponent} from './components/page-works/page-works.component';
import {PlanetModule} from '../planet/planet.module';
import { ListTimelineComponent } from './components/list-timeline/list-timeline.component';


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
        ListChartCirclesComponent,
        ListChartDonutComponent,
        ListChartGaugeComponent,
        DataDetailsComponent,
        PageSkillsComponent,
        PageEducationComponent,
        PageWorksComponent,
        ListTimelineComponent,
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
        PageWrapperModule,
        MatListModule,
        SvgIconModule,
        ChartGaugeModule,
        ChartCircleModule,
        ChartDonutModule,
        MatRippleModule,
        ActiveSwitchModule,
        SelectEntityModule,
        PlanetModule
    ],
  exports: [
    MainComponent,
    LayoutComponent
  ],
})
export class MainModule { }
