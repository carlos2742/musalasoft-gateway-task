import { Injectable } from '@angular/core';
import {data} from '../data';
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

  public gatewayById(id) {
    const paramUrl = `${this.url}/${id}`;
    return this.http.get(paramUrl);
  }

  public add(params) {
    return this.http.post(this.url, params);
  }

  public edit(id, params) {
    const paramUrl = `${this.url}/${id}`;
    return this.http.put(paramUrl, params);
  }
}
