import { TestBed, inject } from '@angular/core/testing';

import { GatewaysService } from './gateways.service';

describe('GatewaysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GatewaysService]
    });
  });

  it('should be created', inject([GatewaysService], (service: GatewaysService) => {
    expect(service).toBeTruthy();
  }));
});
