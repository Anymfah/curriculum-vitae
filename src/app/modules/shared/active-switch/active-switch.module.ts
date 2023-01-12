import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActiveSwitchDirective} from './active-switch.directive';
import {ActiveSwitchItemDirective} from './active-switch-item.directive';


@NgModule({
  declarations: [
    ActiveSwitchDirective,
    ActiveSwitchItemDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActiveSwitchDirective,
    ActiveSwitchItemDirective
  ]
})
export class ActiveSwitchModule { }
