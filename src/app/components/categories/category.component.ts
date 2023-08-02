import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { fadeIn } from 'src/app/animations/fadeIn';
import { CategoryState } from 'src/app/NGXS/category.state';
import { GetCategoryNameById } from 'src/app/NGXS/category.action';
import { SendSearch } from 'src/app/NGXS/painting.action';
import { Meta, Title } from '@angular/platform-browser';
import { PaintingsState } from 'src/app/NGXS/painting.state';
import { Painting } from 'src/app/interfaces/paintings';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit, OnDestroy {
  @Select(CategoryState.categoryName) categoryName$!: Observable<string>
  @Select(CategoryState.categories) categories$!: Observable<Category[]>
  @Select(PaintingsState.paintingsForCategoryId) paintingsForCategoryId$!: Observable<Painting[]>;
  @Select(PaintingsState.dictionaryCategoryNumber) dictionaryCategory$!: Observable<{ [id: number]: number }>;
  subscription = new Subscription;
  grid!: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private title: Title,
    private meta: Meta,
  ) { title.setTitle('Art-Shop') }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new SendSearch({ text: '', category: '0' }))
  }

  ngOnInit(): void {
    this.subscription.add(this.route.params.subscribe(params =>
      this.store.dispatch(new GetCategoryNameById(+params['id']))
    ))
    this.subscription.add(this.categoryName$.subscribe(category => {
      if (category) {
        this.title.setTitle(`${category} category | Art-Shop`);
        this.meta.updateTag({ name: 'description', content: `${category}` });
      } else {
        this.title.setTitle('General page | Art-Shop')
      }
    }))
  }

  changeView(view: string) {
    view === 'grid' ? this.grid = true : this.grid = false
  }
}