import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { fadeIn } from 'src/app/animations/fadeIn';
import { CategoryState } from 'src/app/NGXS/category.state';
import { GetCategoryNameById } from 'src/app/NGXS/category.action';
import { SendCategoryIdToState } from 'src/app/NGXS/painting.action';
import { Meta, Title } from '@angular/platform-browser';
import { PaintingsState } from 'src/app/NGXS/painting.state';
import { Painting } from 'src/app/interfaces/paintings';
import { Category } from 'src/app/interfaces/category';
import { BlogState } from '../NGXS/blog.state';
import { Post } from '../interfaces/post';
import { CategoryId, GetCategorysPosts, GetPosts } from '../NGXS/blog.action';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit, OnDestroy {
  @Select(CategoryState.categoryName) categoryName$!: Observable<string>
  @Select(CategoryState.categories) categories$!: Observable<Category[]>
  @Select(PaintingsState.paintingsForCategoryId) paintingsForCategoryId$!: Observable<Painting[]>;
  @Select(PaintingsState.dictionaryCategoryNumber) dictionaryCategory$!: Observable<{ [id: number]: number }>;
  @Select(BlogState.randomPost) randomPost$!: Observable<Post>;
  @Select(BlogState.randomPost1) randomPost1$!: Observable<Post>;
  @Select(BlogState.posts) posts$!: Observable<Post[]>;
  @Select(BlogState.categorysPosts) categorysPosts$!: Observable<Post[]>;
  subscription = new Subscription;
  grid!: boolean;
  scrWidth = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private title: Title,
    private meta: Meta,
  ) { }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerWidth >= 900) { this.scrWidth = true }
    else if (window.innerWidth < 900) { this.scrWidth = false }
  }

  ngOnInit(): void {
    this.getScreenSize();
    this.subscription.add(this.route.params.subscribe(params => {
      this.store.dispatch(new GetCategoryNameById(+params['id']));
      this.store.dispatch(new CategoryId(+params['id']));
      this.store.dispatch(new GetCategorysPosts());
      this.store.dispatch(new SendCategoryIdToState(+params['id']));
    }))
    this.subscription.add(this.categoryName$.subscribe(category => {
      if (category) {
        this.title.setTitle(`Blog ${category} category | Art-Shop`);
        this.meta.updateTag({ name: 'description', content: `${category}` });
      } else {
        this.title.setTitle('Blog | Art-Shop')
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeView(view: string) {
    view === 'grid' ? this.grid = true : this.grid = false
  }

}