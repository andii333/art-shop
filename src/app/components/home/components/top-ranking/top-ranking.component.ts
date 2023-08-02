import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-top-ranking',
  templateUrl: './top-ranking.component.html',
  styleUrls: ['./top-ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopRankingComponent {
  subcategory = 'top ranking'
  numberPaintings = 4
}


