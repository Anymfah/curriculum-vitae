// TODO: Uncomment all lines when https://github.com/ngx-translate/core/pull/1399 is merged
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainModule} from './modules/main/main.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import {SvgSpriteModule} from './modules/shared/svg-sprite/svg-sprite.module';
import {HttpClientModule} from '@angular/common/http';
import { ChartComponent } from './modules/shared/abstracts/chart/chart.component';

/*
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
*/

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      MainModule,
      BrowserAnimationsModule,
      MatTabsModule,
      SvgSpriteModule,
      HttpClientModule
        /*TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),*/
    ],
  exports: [
    //TranslateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
