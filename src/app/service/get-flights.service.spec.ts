import { TestBed } from '@angular/core/testing';

import { GetFlightsService } from './get-flights.service';

describe('GetFlightsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetFlightsService = TestBed.get(GetFlightsService);
    expect(service).toBeTruthy();
  });
});
