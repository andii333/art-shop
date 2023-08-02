import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ReviewState } from 'src/app/NGXS/reviews.state';
import { Review } from 'src/app/interfaces/review';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsComponent {
  @Select(ReviewState.questions) questions$!:Observable<Review[]>;
}
