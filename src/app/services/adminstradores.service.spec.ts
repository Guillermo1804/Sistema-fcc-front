import { TestBed } from '@angular/core/testing';

import { AdminstradoresService } from './adminstradores.service';

describe('AdminstradoresService', () => {
  let service: AdminstradoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminstradoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
