import { TestBed } from '@angular/core/testing';

import { AdminNavGuard } from './admin-nav.guard';

describe('AdminNavGuard', () => {
  let guard: AdminNavGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminNavGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
