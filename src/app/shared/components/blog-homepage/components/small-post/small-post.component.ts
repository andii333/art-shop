import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { fadeIn } from 'src/app/animations/fadeIn';
import { Post } from 'src/app/interfaces/post';
import { CategoryState } from 'src/app/NGXS/category.state';

@Component({
  selector: 'app-small-post',
  templateUrl: './small-post.component.html',
  styleUrls: ['./small-post.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallPostComponent {
  @Input() post$!: Observable<Post>;
  @Input() posts$!: Observable<Post[]>;
  @Select(CategoryState.categoryName) categoryName$!: Observable<string>
  constructor(
    private router: Router
  ) { }
  goToPost(postId: number, categoryId: number) {
    this.router.navigate([`/blog/${categoryId}/blog-details/${postId}`])
  }
}
