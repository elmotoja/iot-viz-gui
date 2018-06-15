import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {IotDeviceTypeModel} from '../../core/model/iot-device-type.model';
import {IotDeviceModel} from '../../core/model/iot-device.model';
import {Observable} from 'rxjs/Observable';
import {IotService} from '../iot.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stats-component',
  templateUrl: './stats.component.html',
  animations: [routerTransition()]
})

export class StatsComponent implements OnInit {
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 10
        }
      }]
    }
  };
  iotDevices: Observable<Array<IotDeviceModel>> | undefined;
  date = new Date();
  public barChartLabels: string[] = [
    moment().subtract(6, 'days').format('DD.MM.YY'),
    moment().subtract(5, 'days').format('DD.MM.YY'),
    moment().subtract(4, 'days').format('DD.MM.YY'),
    moment().subtract(3, 'days').format('DD.MM.YY'),
    moment().subtract(2, 'days').format('DD.MM.YY'),
    moment().subtract(1, 'days').format('DD.MM.YY'),
    moment().format('DD.MM.YY')
  ];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [
    {data: [3, 5, 4, 4, 5, 8, 6], label: 'Urządzenia IoT'},
  ];
  // Doughnut
  public doughnutChartLabels: string[] = [
    'Drukarka',
    'Skaner',
    'Mikrokontroler'
  ];
  public doughnutChartData: number[] = [20, 50, 30];
  public doughnutChartType = 'doughnut';

  constructor(private iotService: IotService) {
  }

  ngOnInit() {
    this.iotDevices = this.iotService.getHistoricalIotDevices().map(data => {
      const items = <IotDeviceModel[]>data;
      items.forEach(device => device.type ? device.type = IotDeviceTypeModel[device.type] : device.type = IotDeviceTypeModel.undefined);
      return items;
    }).share();
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

}
