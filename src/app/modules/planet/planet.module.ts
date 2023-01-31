import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanetComponent} from './planet.component';


@NgModule({
  declarations: [
    PlanetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlanetComponent
  ]
})
export class PlanetModule { }
