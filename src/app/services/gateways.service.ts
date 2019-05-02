import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class GatewaysService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/gateways`;
  }

  get list() {
    return this.http.get(this.url);
  }

  public gatewayById(gatewayId) {
    const urlParam = `${this.url}/${gatewayId}`;
    return this.http.get(urlParam);
  }

  public add(data) {
    return this.http.post(this.url, data);
  }

  public edit(gatewayId, data) {
    const urlParam = `${this.url}/${gatewayId}`;
    return this.http.put(urlParam, data);
  }

  public deviceList(gatewayId) {
    const urlParam = `${this.url}/${gatewayId}/devices`;
    return this.http.get(urlParam);
  }

  public addDevice(gatewayId, data) {
    const urlParam = `${this.url}/${gatewayId}/device`;
    return this.http.post(urlParam, data);
  }
}
