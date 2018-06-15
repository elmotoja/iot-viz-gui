import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AppComponent} from './app.component';
import {IotModule} from './iot/iot.module';
import {AppRouting} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRouting,
    BrowserModule,
    IotModule,
    RouterModule,
    CoreModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
