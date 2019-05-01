import { Injectable } from '@angular/core';
import {data} from '../data';
@Injectable()
export class GatewaysService {

  private gateways: Array<any>;
  constructor() {
    this.gateways = data;
  }

  get list() {
    return this.gateways;
  }

  private existSerial(serial) {
    const exist = this.gateways.find( item => item.serial === serial) ? true : false;
    return exist;
  }

  public getGatewayById(id) {
    return this.gateways.find(item => item.id === parseInt(id));
  }

  public add(params) {
    if (this.existSerial(params['serial'])) {
      return false;
    } else {
      params['devices'] = [];
      params['id'] = (this.gateways.length + 1);
      this.gateways.push(params);
      return true;
    }
  }

  public edit( id, params) {
    if (this.existSerial(params['serial'])) {
      return false;
    } else {
      const gw = this.getGatewayById(id);
      gw.serial = params.serial;
      gw.name = params.name;
      gw.ipv4 = params.ipv4;
      return true;
    }
  }
}
