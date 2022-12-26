import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import {LayoutComponent} from "./components/layout/layout.component";
import {MatTabsModule} from "@angular/material/tabs";



@NgModule({
    declarations: [
        MainComponent,
        LayoutComponent,
    ],
  imports: [
    CommonModule,
    MatTabsModule
  ],
  exports: [
    MainComponent,
    LayoutComponent
  ],
})
export class MainModule { }
