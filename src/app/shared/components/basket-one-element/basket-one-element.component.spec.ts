import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { BasketState } from 'src/app/NGXS/basket.state';
import { BasketOneElementComponent } from './basket-one-element.component';

describe('BasketOneElementComponent', () => {
  let component: BasketOneElementComponent;
  let fixture: ComponentFixture<BasketOneElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketOneElementComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NgxsModule.forRoot([BasketState])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BasketOneElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
