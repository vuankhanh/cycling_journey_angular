import { TestBed } from '@angular/core/testing';

import { SetGoogleMapsApiKeyService } from './set-google-maps-api-key.service';

describe('SetGoogleMapsApiKeyService', () => {
  let service: SetGoogleMapsApiKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetGoogleMapsApiKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
