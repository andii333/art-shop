import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PaintingService } from './painting.service';

describe('PaintingService', () => {
  let service: PaintingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PaintingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
