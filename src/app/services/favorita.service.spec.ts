import { TestBed } from '@angular/core/testing';

import { FavoritaService } from './favorita.service';

describe('FavoritaService', () => {
  let service: FavoritaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
