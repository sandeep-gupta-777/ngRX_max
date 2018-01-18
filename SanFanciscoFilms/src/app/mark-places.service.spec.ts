import { TestBed, inject } from '@angular/core/testing';

import { MarkPlacesService } from './mark-places.service';

describe('MarkPlacesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkPlacesService]
    });
  });

  it('should be created', inject([MarkPlacesService], (service: MarkPlacesService) => {
    expect(service).toBeTruthy();
  }));
});
