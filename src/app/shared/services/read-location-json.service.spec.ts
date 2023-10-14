import { TestBed } from '@angular/core/testing';

import { ReadLocationJsonService } from './read-location-json.service';

describe('ReadLocationJsonService', () => {
  let service: ReadLocationJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadLocationJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
