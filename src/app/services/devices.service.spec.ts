import { TestBed, inject } from '@angular/core/testing';

import { DevicesService } from './devices.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('DevicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevicesService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([DevicesService], (service: DevicesService) => {
    expect(service).toBeTruthy();
  }));
});
