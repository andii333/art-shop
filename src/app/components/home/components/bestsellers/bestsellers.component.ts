import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bestsellers',
  templateUrl: './bestsellers.component.html',
  styleUrls: ['./bestsellers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BestsellersComponent{
  subcategory = 'bestsellers'
  numberPaintings = 3
}
