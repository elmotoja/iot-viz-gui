import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './iot/map/map.component';
import {StatsComponent} from './iot/stats/stats.component';
import {SettingsComponent} from './iot/settings/settings.component';
import {HistoryComponent} from './iot/history/history.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
