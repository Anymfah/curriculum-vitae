import { TestBed } from '@angular/core/testing';

import { EntityListService } from './entity-list.service';

describe('EntityListService', () => {
  let service: EntityListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
