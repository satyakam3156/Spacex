import { TestBed } from '@angular/core/testing';

import { LaunchsService } from './launchs.service';

describe('LaunchsService', () => {
  let service: LaunchsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaunchsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
