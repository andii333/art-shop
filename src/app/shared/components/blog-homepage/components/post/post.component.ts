import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { ActivePost } from 'src/app/NGXS/blog.action';
import { CategoryState } from 'src/app/NGXS/category.state';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
  @Input() post$!: Observable<Post>;
  @Input() posts$!: Observable<Post[]>;
  @Select(CategoryState.categoryName) categoryName$!: Observable<string>

  constructor(
    private router:Router,
    private store: Store
  ){}
  goToPost(postId:number, categoryId:number){
    this.store.dispatch(new ActivePost(postId))
    this.router.navigate([`/blog/${categoryId}/blog-details/${postId}`])
  }
}
