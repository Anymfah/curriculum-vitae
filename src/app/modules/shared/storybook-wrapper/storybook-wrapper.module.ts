import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorybookWrapperComponent } from './storybook-wrapper.component';



@NgModule({
  declarations: [
    StorybookWrapperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StorybookWrapperComponent
  ]
})
export class StorybookWrapperModule { }
