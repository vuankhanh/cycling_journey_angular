import { TestBed } from '@angular/core/testing';

import { BreakpointDetectionService } from './breakpoint-detection.service';

describe('BreakpointDetectionService', () => {
  let service: BreakpointDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
