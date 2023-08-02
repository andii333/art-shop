import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BasketWindowComponent } from './basket-window.component';

describe('BasketWindowComponent', () => {
  let component: BasketWindowComponent;
  let fixture: ComponentFixture<BasketWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketWindowComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
