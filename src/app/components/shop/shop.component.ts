import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BasketState } from 'src/app/NGXS/basket.state';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent {
  @Select(BasketState.open) open$!: Observable<boolean>;
  constructor(public title: Title){this.title.setTitle('Art-Shop')}
}
    
