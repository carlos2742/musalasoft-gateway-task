import { Injectable } from '@angular/core';

@Injectable()
export class GatewaysService {

  private gateways: Array<any>;
  constructor() {
    this.gateways = [
      {
        id: '1',
        name: 'Gateway 1',
        ipv4: '10.0.0.1',
        devices: [
          {
            uid: 1,
            vendor: 'HP',
            created: 'Tue Apr 29 2019 17:01:51',
            status: 'offline'
          }
        ]
      }
    ];
  }

  get list() {
    return this.gateways;
  }

  public getGatewayById(id) {
    return this.gateways.find(item => item.id === id);
  }

  public addGateway(data) {
    this.gateways.push(data);
  }

  public editGateway(data, id) {
    const gw = this.gateways[id];
    gw.name = data.name;
    gw.ipv4 = data.ipv4;
  }

  public getDeviceByUid(id, uid) {
    const gw = this.getGatewayById(id);
    return gw.devices.find(item => item.uid === uid);
  }

  public addDevice(id, data) {
    const gw = this.getGatewayById(id);
    data['uid'] = gw.devices.length + 1;
    gw.devices.push(data);
  }

  public editDevice(id, uid, data) {
    const dv = this.getDeviceByUid(id, uid);
    dv.vendor = data.vendor;
    dv.status = data.status;
  }

}
