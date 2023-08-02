import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MostPopularComponent {
  subcategory = 'most popular'
  numberPaintings = 3
}
