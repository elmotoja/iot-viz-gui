import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MapComponent} from './map/map.component';
import {StatsComponent} from './stats/stats.component';
import {HistoryComponent} from './history/history.component';
import {SettingsComponent} from './settings/settings.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ChartsModule as Ng2Charts} from 'ng2-charts';
import {IotService} from './iot.service';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    MapComponent,
    StatsComponent,
    HistoryComponent,
    SettingsComponent
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    Ng2Charts
  ],
  exports: [
    MapComponent,
    StatsComponent,
    HistoryComponent,
    SettingsComponent
  ],
  providers: [
    IotService,
    NgbAlertConfig
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class IotModule {
}
