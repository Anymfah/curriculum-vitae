import { TestBed } from '@angular/core/testing';

import { SvgSpriteService } from './svg-sprite.service';

describe('SvgSpriteService', () => {
  let service: SvgSpriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgSpriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
