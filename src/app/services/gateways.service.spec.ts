import { TestBed, inject } from '@angular/core/testing';

import { GatewaysService } from './gateways.service';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';

function asyncData(data) {
  return new Observable<any>(observer => {
    observer.next(data);
    observer.complete();
  });
}

function asyncError(errorObj) {
  return new Observable<any>(observer => {
    observer.error(errorObj);
    observer.complete();
  });
}

let httpClientSpy: {get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy};
let gatewaysService: GatewaysService;
const expectedGateway: any = {id: 1, serial: 'QWER', name: 'Asia', ipv4: '10.0.0.1'};

describe('Gateways Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [GatewaysService]});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    gatewaysService = new GatewaysService(<any> httpClientSpy);
  });

  it('should return a GET request', () => {
    const expectedGateways: any[] = [expectedGateway];
    httpClientSpy.get.and.returnValue(asyncData(expectedGateways));

    gatewaysService.list.subscribe(
      gateways => expect(gateways).toEqual(expectedGateways),
      fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should execute a POST request', () => {
    httpClientSpy.post.and.returnValue(asyncData(expectedGateway));
    const newGateway = {...expectedGateway};
    delete newGateway.id;
    gatewaysService.add(newGateway).subscribe(
      gateway => expect(gateway).toEqual(expectedGateway),
      fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should execute a PUT request', () => {
    const editedGateway = { ...expectedGateway, serial: 'ASD12'};
    httpClientSpy.put.and.returnValue(asyncData(editedGateway));

    gatewaysService.edit(expectedGateway.id, { ...expectedGateway, serial: 'ASD12'}).subscribe(
      gateway => expect(gateway).toEqual(editedGateway),
      fail);

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('should return an error on server error 400', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Serial number must be unique',
      status: 400,
      statusText: 'Bad Request'
    });

    httpClientSpy.post.and.returnValue(asyncError(errorResponse));

    gatewaysService.add(expectedGateway).subscribe(
      () => fail('expected an error, not gateways'),
      ({error}) => expect(error).toContain('Serial number must be unique')
    );
  });
});
