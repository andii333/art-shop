import { Component, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-big-post',
  templateUrl: './big-post.component.html',
  styleUrls: ['./big-post.component.scss']
})
export class BigPostComponent {
@Input() post$!: Observable<Post>;

}
