import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { BlogState } from 'src/app/NGXS/blog.state';

@Component({
  selector: 'app-blog-homepage',
  templateUrl: './blog-homepage.component.html',
  styleUrls: ['./blog-homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogHomepageComponent {
  @Select(BlogState.randomPost) randomPost$!: Observable<Post>;
  @Select(BlogState.randomPosts) randomPosts$!: Observable<Post[]>;
  scrWidth!: number;
  constructor() { this.getScreenSize() }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerWidth >= 1230) { this.scrWidth = 3 }
    else if (window.innerWidth >= 860) { this.scrWidth = 2 }
    else if (window.innerWidth < 860) { this.scrWidth = 1 }
  }

}
