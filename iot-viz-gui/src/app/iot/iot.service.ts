import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class IotService {

  mainUrl = environment.url;

  constructor(private http: HttpClient) {
  }

  getIotDevices(): Observable<any> {
    return this.http.get(this.mainUrl + 'iot-devices');
  }

  getHistoricalIotDevices(): Observable<any> {
    return this.http.get(this.mainUrl + 'iot-devices-history');
  }

  getConfig(): Observable<any> {
    return this.http.get(this.mainUrl + 'config');
  }
}
