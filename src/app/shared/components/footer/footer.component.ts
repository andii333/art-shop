import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Subscription, Observable } from 'rxjs';
import { BasketState } from 'src/app/NGXS/basket.state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  subscription!:Subscription;
  @Select(BasketState.checkoutPage) checkoutPage$!:Observable<boolean>;
}
