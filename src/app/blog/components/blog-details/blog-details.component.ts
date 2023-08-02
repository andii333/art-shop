import { ChangeDetectionStrategy, Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { fadeIn } from 'src/app/animations/fadeIn';
import { CategoryState } from 'src/app/NGXS/category.state';
import { GetCategoryNameById } from 'src/app/NGXS/category.action';
import { SendCategoryIdToState } from 'src/app/NGXS/painting.action';
import { PaintingsState } from 'src/app/NGXS/painting.state';
import { Painting } from 'src/app/interfaces/paintings';
import { Category } from 'src/app/interfaces/category';
import { BlogState } from 'src/app/NGXS/blog.state';
import { Post } from 'src/app/interfaces/post';
import { ActiveDetails, ActivePost, CategoryId, GetCategorysPosts, GetReplies, SendReply } from 'src/app/NGXS/blog.action';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  @Select(CategoryState.categoryName) categoryName$!: Observable<string>
  @Select(CategoryState.categories) categories$!: Observable<Category[]>
  @Select(PaintingsState.paintingsForCategoryId) paintingsForCategoryId$!: Observable<Painting[]>;
  @Select(PaintingsState.dictionaryCategoryNumber) dictionaryCategory$!: Observable<{ [id: number]: number }>;
  @Select(BlogState.randomPost) randomPost$!: Observable<Post>;
  @Select(BlogState.randomPost1) randomPost1$!: Observable<Post>;
  @Select(BlogState.posts) posts$!: Observable<Post[]>;
  @Select(BlogState.categorysPosts) categorysPosts$!: Observable<Post[]>;
  @Select(BlogState.activePost) activePost$!: Observable<Post>;
  @Select(BlogState.detail) detail$!: Observable<boolean>;
  
  subscription = new Subscription;
  scrWidth!: boolean;
  postId!: number;
  replyId!: number;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private title: Title,
    private meta: Meta,
  ) { title.setTitle('Details of our blog | Art-Shop') }
  
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerWidth >= 900) { this.scrWidth = true }
    else if (window.innerWidth < 900) { this.scrWidth = false }
  }
  
  ngOnInit(): void {
    this.setTitle();
    this.getIdFromParams();
    this.getScreenSize();
    this.store.dispatch(new GetReplies());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setTitle() {
    this.subscription.add(this.categoryName$.subscribe(category => {
      if (category) {
        this.title.setTitle(`Blog ${category} category | Art-Shop`);
        this.meta.updateTag({ name: 'description', content: `${category}` });
      } else {
        this.title.setTitle('Blog | Art-Shop')
      }
    }));
  }

  getIdFromParams() {
    this.subscription.add(this.route.params.subscribe(params => {
      this.postId = +params['id']
      this.store.dispatch(new GetCategoryNameById(this.postId));
      this.store.dispatch(new CategoryId(this.postId));
      this.store.dispatch(new ActivePost(this.postId));
      this.store.dispatch(new GetCategorysPosts());
      this.store.dispatch(new SendCategoryIdToState(this.postId));
    }));
  }


  openReplyForm(){
this.store.dispatch(new ActiveDetails(false))
  }
  closeReplyForm(){
this.store.dispatch(new ActiveDetails(true))
  }
  
}
