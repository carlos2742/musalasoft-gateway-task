import { TestBed, inject } from '@angular/core/testing';

import { DevicesService } from './devices.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DevicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DevicesService]
    });
  });

  it('should be created', inject([DevicesService], (service: DevicesService) => {
    expect(service).toBeTruthy();
  }));
});
