import { TestBed } from '@angular/core/testing';

import { VariosService } from './varios.service';

describe('VariosService', () => {
  let service: VariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
