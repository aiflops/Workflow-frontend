import { TestBed } from '@angular/core/testing';

import { MounthService } from './mounth.service';

describe('MounthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MounthService = TestBed.get(MounthService);
    expect(service).toBeTruthy();
  });
});
