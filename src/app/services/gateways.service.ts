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

  public getGatewayById(id) {
    return this.gateways.find(item => item.id === id);
  }

  public add(params) {
    params['devices'] = [];
    params['id'] = (this.gateways.length + 1).toString();
    this.gateways.push(params);
  }

  public edit( id, params) {
    const gw = this.getGatewayById(id);
    gw.name = params.name;
    gw.ipv4 = params.ipv4;
  }
}
