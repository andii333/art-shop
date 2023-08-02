import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { OpenBasket } from 'src/app/NGXS/basket.action';
import { BasketState } from 'src/app/NGXS/basket.state';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent {
  @Select(BasketState.subtotal) subtotal$!: Observable<number>;
  subscription!: Subscription;
  previousPath!: string
  constructor(
    private router: Router,
    private store: Store,
  ) { }

  closeBasketWindow(): void {
    this.store.dispatch(new OpenBasket(false));
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
    this.store.dispatch(new OpenBasket(false));
  }
}
