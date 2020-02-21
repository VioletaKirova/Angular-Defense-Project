import { TestBed } from '@angular/core/testing';

import { ErrorHandlerInterceptorService } from './error-handler-interceptor.service';

describe('ErrorHandlerInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorHandlerInterceptorService = TestBed.get(ErrorHandlerInterceptorService);
    expect(service).toBeTruthy();
  });
});
