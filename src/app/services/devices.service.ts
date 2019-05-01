import { Injectable } from '@angular/core';
import {data} from '../data';

@Injectable()
export class DevicesService {

  private gateways: Array<any>;
  constructor() {
    this.gateways = data;
  }

  private getGatewayById(id) {
    return this.gateways.find(item => item.id === parseInt(id));
  }

  public getDeviceByUid(gwId, dvId) {
    const gw = this.getGatewayById(gwId);
    return gw.devices.find(item => item.id === parseInt(dvId));
  }

  public add(id, params) {
    const gw = this.getGatewayById(id);
    params['id'] = gw.devices.length + 1;
    gw.devices.push(params);
  }

  public edit(gwId, dvId, params) {
    const dv = this.getDeviceByUid(gwId, dvId);
    dv.vendor = params.vendor;
    dv.status = params.status;
    dv.uid = params.uid;
  }

  public remove(gwId, dvId) {
    const gw = this.getGatewayById(gwId);
    const index = gw.devices.findIndex(item => item.id === parseInt(dvId));
    gw.devices.splice(index, 1);
  }

}
