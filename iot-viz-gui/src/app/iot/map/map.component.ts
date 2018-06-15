import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {routerTransition} from '../../router.animations';

import {IotDeviceModel} from '../../core/model/iot-device.model';
import {IotService} from '../iot.service';
import {IotDeviceTypeModel} from '../../core/model/iot-device-type.model';

@Component({
  selector: 'app-map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  animations: [routerTransition()]
})

export class MapComponent implements OnInit {

  iotDevices: Observable<Array<IotDeviceModel>> | undefined;
  searchInput = '';
  interval: any;

  alerts: Array<IAlert> = [];
  timeInMinutes = 0.5;

  constructor(private iotService: IotService, private alertConfig: NgbAlertConfig) {
  }

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 60000 * this.timeInMinutes);
  }


  refreshData() {
    this.iotDevices = this.iotService.getIotDevices().map(data => {
      const items = <IotDeviceModel[]>data;
      items.forEach(device => device.type ? device.type = IotDeviceTypeModel[device.type] : device.type = IotDeviceTypeModel.undefined);
      return items;
    }).share();
    this.filterDevicesList('');
    this.checkStatus();
  }

  checkStatus() {
    this.iotDevices.forEach(device => device.forEach(d => {
        if (d.status !== 'ok') {
          this.alerts.push({type: d.status, device: d.serialNumber, message: 'Internal Error'});
        }
      })
    );
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  changeColor(status: string): string {
    let color = 'green';
    if (status === 'warning') {
      color = 'orange';
    }
    if (status === 'danger') {
      color = 'red';
    }
    return color;
  }

  filterDevicesList(event: any) {
    let input;
    input = document.getElementById('searchInput');
    this.searchInput = input.value;
    this.iotDevices = this.iotDevices.map(dev => dev.filter(device =>
      device.name.indexOf(this.searchInput) > -1
      || device.type.indexOf(this.searchInput) > -1
      || device.description.indexOf(this.searchInput) > -1
      || device.model.indexOf(this.searchInput) > -1
      || device.manufacturer.indexOf(this.searchInput) > -1
      || device.serialNumber.indexOf(this.searchInput) > -1));
  }
}


export interface IAlert {
  type: string;
  device: string;
  message: string;
}
