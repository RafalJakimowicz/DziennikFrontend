import { TestBed } from '@angular/core/testing';

import { WebTokenService } from './web-token.service';

describe('WebTokenService', () => {
  let service: WebTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
