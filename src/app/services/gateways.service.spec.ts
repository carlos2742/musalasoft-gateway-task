import { TestBed, inject } from '@angular/core/testing';

import { GatewaysService } from './gateways.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GatewaysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GatewaysService]
    });
  });

  it('should be created', inject([GatewaysService], (service: GatewaysService) => {
    expect(service).toBeTruthy();
  }));
});
