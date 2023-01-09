import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorybookWrapperComponent} from './storybook-wrapper.component';
import {SvgSpriteModule} from '../svg-sprite/svg-sprite.module';
import {SvgIconModule} from '../svg-icon/svg-icon.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [
    StorybookWrapperComponent
  ],
  imports: [
    CommonModule,
    SvgSpriteModule,
    SvgIconModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    StorybookWrapperComponent
  ]
})
export class StorybookWrapperModule { }
