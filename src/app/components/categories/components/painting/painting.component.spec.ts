import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PaintingComponent } from './painting.component';
import { BasketState } from 'src/app/NGXS/basket.state';
import { CategoryState } from 'src/app/NGXS/category.state';
import { PaintingsState } from 'src/app/NGXS/painting.state';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PaintingComponent', () => {
  let component: PaintingComponent;
  let fixture: ComponentFixture<PaintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaintingComponent ],
      imports: [NgxsModule.forRoot([PaintingsState, BasketState, CategoryState]), RouterTestingModule, HttpClientModule  ],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
