import { TestBed } from '@angular/core/testing';

import { RegisterloginGuardService } from './registerlogin-guard.service';

describe('RegisterloginGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterloginGuardService = TestBed.get(RegisterloginGuardService);
    expect(service).toBeTruthy();
  });
});
