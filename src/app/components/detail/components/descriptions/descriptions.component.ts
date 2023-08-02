import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Painting } from 'src/app/interfaces/paintings';
import { PaintingsState } from 'src/app/NGXS/painting.state';

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DescriptionsComponent {
@Select(PaintingsState.paintingsForPaintingId) painting$!:Observable<Painting>
}
