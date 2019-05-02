import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DevicesService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/devices`;
  }

  public deviceById(deviceId) {
    const urlParam = `${this.url}/${deviceId}`;
    return this.http.get(urlParam);
  }

  public edit(deviceId, data) {
    const urlParam = `${this.url}/${deviceId}`;
    return this.http.put(urlParam, data);
  }

  public remove(deviceId) {
    const urlParam = `${this.url}/${deviceId}`;
    return this.http.delete(urlParam);
  }

}
