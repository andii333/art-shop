import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
constructor(
  public title:Title,
  private meta: Meta){
    this.title.setTitle('Art-Shop');
  this.meta.addTags([
    { name: 'keywords', content:'painting shop, art shop, picture shop, art gallery'},
    {name : 'description', content: 'present, gift, art, painting buy'}
])}
}
