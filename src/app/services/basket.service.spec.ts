import { TestBed } from '@angular/core/testing';

import { BasketService } from './basket.service';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


// MockComponent({ selector: 'rt-input-block-es', inputs: ['placeholder', 'form', 'label', 'globalError', 'disabled', 'errors'] }),

//   { provide: FirestoreService, useValue: fbServiceSpy },
//   let fbServiceSpy: jasmine.SpyObj<FirestoreService>;

// this.store.select(state => state.data.addReviewHomeSuccess).subscribe(() => this.form.reset())

