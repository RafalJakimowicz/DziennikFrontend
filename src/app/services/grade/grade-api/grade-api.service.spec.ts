import { TestBed } from '@angular/core/testing';

import { GradeApiService } from './grade-api.service';

describe('GradeApiService', () => {
  let service: GradeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
