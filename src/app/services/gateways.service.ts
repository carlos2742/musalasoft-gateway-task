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
            uid: 456,
            vendor: 'T-mobile',
            createdDate: '2019-04-30',
            status: 'offline'
          }
        ]
      }
    ];
  }

  get list() {
    return this.gateways;
  }

}
