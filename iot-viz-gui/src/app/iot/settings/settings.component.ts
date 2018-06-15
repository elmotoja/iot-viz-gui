import {Component} from '@angular/core';
import {routerTransition} from '../../router.animations';

@Component({
  selector: 'app-settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  animations: [routerTransition()]
})

export class SettingsComponent {

}
