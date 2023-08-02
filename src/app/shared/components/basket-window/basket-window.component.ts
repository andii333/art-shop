import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { OpenBasket } from 'src/app/NGXS/basket.action';

@Component({
  selector: 'app-basket-window',
  templateUrl: './basket-window.component.html',
  styleUrls: ['./basket-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketWindowComponent {
  constructor(
    private store: Store,
    ) { }
  
    closeBasketWindow(): void {
    this.store.dispatch(new OpenBasket(false));
  }
}
