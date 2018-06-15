import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';

import 'rxjs/add/operator/map';
import {Chart} from 'chart.js';

import {IotService} from '../iot.service';
import {IotDeviceModel} from '../../core/model/iot-device.model';
import {IotDeviceTypeModel} from '../../core/model/iot-device-type.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-history-component',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [routerTransition()]
})

export class HistoryComponent implements OnInit {
  chart = [];
  iotDevices: Observable<Array<IotDeviceModel>> | undefined;
  active = 0;
  selectedDevice: Observable<IotDeviceModel> | undefined;

  constructor(private iotService: IotService) {
  }

  ngOnInit() {
    this.iotDevices = this.iotService.getHistoricalIotDevices().map(data => {
      const items = <IotDeviceModel[]>data;
      items.forEach(device => device.type ? device.type = IotDeviceTypeModel[device.type] : device.type = IotDeviceTypeModel.undefined);
      return items;
    }).share();
    this.select(this.active);
  }

  select(deviceId: number) {
    this.selectedDevice = this.iotDevices.map(device => {
      return device[deviceId];
    });
    this.active = deviceId;
  }
}
