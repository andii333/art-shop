import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Painting } from '../../../interfaces/paintings';
import { Select, Store } from '@ngxs/store';
import { BasketState } from 'src/app/NGXS/basket.state';
import { DeleteProductFromBasket } from 'src/app/NGXS/basket.action';

@Component({
  selector: 'app-basket-one-element',
  templateUrl: './basket-one-element.component.html',
  styleUrls: ['./basket-one-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketOneElementComponent {
  pcs!:number;
  @Select(BasketState.products) products$!: Observable<Painting[]>;
  constructor(private store:Store ) { }

  deleteProductFromBasket(id: number){
    this.store.dispatch(new DeleteProductFromBasket(id));
  } 

  getNumberPcs(numberPcs: HTMLInputElement){
    this.pcs = +numberPcs.value;
  }
}
