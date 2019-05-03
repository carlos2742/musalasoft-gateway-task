import { TestBed, inject } from '@angular/core/testing';

import { GatewaysService } from './gateways.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('GatewaysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GatewaysService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([GatewaysService], (service: GatewaysService) => {
    expect(service).toBeTruthy();
  }));
});
