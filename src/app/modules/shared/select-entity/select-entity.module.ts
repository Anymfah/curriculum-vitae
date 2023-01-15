import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectEntityDirective} from './select-entity.directive';


@NgModule({
  declarations: [
    SelectEntityDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectEntityDirective
  ]
})
export class SelectEntityModule { }
