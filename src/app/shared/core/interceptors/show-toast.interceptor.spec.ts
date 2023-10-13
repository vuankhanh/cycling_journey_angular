import { TestBed } from '@angular/core/testing';

import { ShowToastInterceptor } from './show-toast.interceptor';

describe('ShowToastInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ShowToastInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ShowToastInterceptor = TestBed.inject(ShowToastInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
