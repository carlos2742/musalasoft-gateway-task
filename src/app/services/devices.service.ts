import { Injectable } from '@angular/core';
import {data} from '../data';

@Injectable()
export class DevicesService {

  private gateways: Array<any>;
  constructor() {
    this.gateways = data;
  }

  private getGatewayById(id) {
    return this.gateways.find(item => item.id === id);
  }

  public getDeviceByUid(id, uid) {
    const gw = this.getGatewayById(id);
    return gw.devices.find(item => item.uid === uid);
  }

  public addDevice(id, params) {
    const gw = this.getGatewayById(id);
    params['uid'] = gw.devices.length + 1;
    gw.devices.push(params);
  }

  public editDevice(id, uid, params) {
    const dv = this.getDeviceByUid(id, uid);
    dv.vendor = params.vendor;
    dv.status = params.status;
  }

}
