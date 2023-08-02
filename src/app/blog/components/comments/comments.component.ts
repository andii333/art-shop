import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BlogState } from 'src/app/NGXS/blog.state';
import { Comments } from 'src/app/interfaces/comments';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
@Input() action!:string;
  @Input() typeForm!:string;
  @Input() existComments!:boolean;
  @Select(BlogState.getComments) comments$!: Observable<Comments[]>;

  // constructor(private store:Store) { }

}
