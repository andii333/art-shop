import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { ReviewState } from 'src/app/NGXS/reviews.state';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NgxsModule.forRoot([ReviewState]), ReactiveFormsModule, HttpClientModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 5 controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('rating')).toBeTruthy();
    expect(component.form.contains('comments')).toBeTruthy();
    expect(component.form.contains('paintingId')).toBeTruthy();
  });

  it('should check if required validator works', () => {
    const nameControl = component.form.get('name')
    const email = component.form.get('email')
    const rating = component.form.get('rating')
    nameControl?.setValue('')
    email?.setValue('')
    rating?.setValue('')
    expect(nameControl?.valid).toBeFalse();
    expect(email?.valid).toBeFalse();
    expect(rating?.valid).toBeFalse();
  });

  it('should check if name validator works by 2 letters', () => {
    const nameControl = component.form.get('name')
    nameControl?.setValue('as')
    expect(nameControl?.valid).toBeFalse();
  });

  it('should check if name validator works with 21 letters', () => {
    const nameControl = component.form.get('name')
    nameControl?.setValue('asdfghjklzxcvbnmqwert')
    expect(nameControl?.valid).toBeFalse();
  });

  it('should check if email validator works', () => {
    const email = component.form.get('email')
    email?.setValue('sdasda')
    expect(email?.valid).toBeFalse();
  });

  it('should check if comments validator works with 1001 letters', () => {
    const comments = component.form.get('comments')
    comments?.setValue(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, veniam! Ad pariatur non, sint, maxime alias nobis accusamus architecto molestiae recusandae sunt nihil totam. Quisquam ad esse nulla fugiat tempora, voluptatum dolore distinctio incidunt libero eos facilis laudantium nostrum debitis et non itaque facere. Amet magnam itaque, ipsam fugiat, quisquam officia eum nostrum maxime laudantium reprehenderit facilis facere cum animi placeat suscipit dolorum ad illo rerum pariatur. Voluptate commodi qui ex sint sed nulla dolore porro, dignissimos adipisci iure hic nisi inventore accusamus corrupti nostrum, deserunt perferendis beatae reiciendis fugiat omnis praesentium magnam non illo ipsa. Animi sed adipisci numquam pariatur similique voluptatum fugit distinctio atque dicta, ipsa provident veritatis perferendis tenetur a debitis cum quisquam, molestias qui totam? Vel omnis culpa obcaecati suscipit illo, neque repellat consequatur laudantium saepe numquam aliquam deleniti ipsa aliquid ipsam officiis corporis labore quam vitae assumenda quaerat voluptas. Possimus quod cupiditate, quo iure, voluptatem ab nulla enim natus ex doloribus molestias dicta laborum velit aliquam aperiam, alias accusantium quidem blanditiis! Officia voluptate eos ipsam dolorum eaque reprehenderit nihil nulla est ex placeat? Magnam quaerat ducimus eligendi, ad sapiente quos qui, tempore voluptatem cupiditate cumque minus assumenda atque, ea nobis odit esse ullam nisi! At unde voluptates possimus facere similique, officia expedita adipisci atque quisquam maxime accusantium voluptatum praesentium odio ipsa maiores a ratione asperiores ea repellendus earum eos impedit excepturi consequuntur provident. Molestias ullam debitis velit doloribus porro accusantium dolores commodi repudiandae ipsam itaque hic dicta magni vel, aut at sed molestiae, aliquam pariatur, earum excepturi? Nulla rem eum, eveniet, eos debitis labore quibusdam porro numquam tempore, ex recusandae asperiores repellat deserunt quae eius quas? Similique illo placeat laborum inventore maxime esse voluptas. Ex, iusto rem? Esse neque dolor, inventore nam necessitatibus similique quod! Fugiat voluptates dolorem ullam exercitationem quis atque officiis eligendi consectetur, possimus illo suscipit iusto corporis fuga iste eos molestias molestiae, ducimus consequuntur! Labore provident iusto facere veritatis vero quibusdam nostrum odit voluptatem vel doloribus itaque eveniet, facilis laudantium quaerat delectus aliquam eos? Ex ipsum repellat reprehenderit temporibus enim ab optio at odio, iste qui voluptate doloribus debitis quidem cupiditate, quo nemo hic. Iusto, eius, sapiente temporibus voluptate ex qui quo a, officiis in quaerat repellendus facilis unde tempore consequuntur ratione sint corporis obcaecati! Dolores sed, veritatis aliquid labore sunt ullam similique ex id, ab culpa magni! Nemo unde inventore fugit debitis minus quis! Suscipit nemo vel dolor eligendi neque veniam, aspernatur hic excepturi incidunt. A explicabo ad nisi est qui eum dicta quae dolorem! Fuga corporis deserunt et dolores atque illo, earum aliquid sed quam dicta dolorum non aspernatur hic totam iure, dolore quo, molestias dignissimos impedit! Corporis officiis explicabo facilis voluptatum eveniet natus labore ad nesciunt animi voluptates at, accusantium reprehenderit sunt neque nostrum rem atque laudantium maiores autem sed distinctio quas aut esse! Corrupti fugiat provident ullam sunt non molestias harum tempore ratione rem, aperiam laudantium ipsam quas obcaecati veniam impedit odio consectetur necessitatibus hic minus. Magnam temporibus cupiditate officia, deleniti natus quis commodi iste error, at voluptates deserunt quisquam nostrum exercitationem assumenda, aut alias tenetur soluta nihil dolorum architecto vero. At exercitationem distinctio id eum autem eligendi, reprehenderit odit aut? Architecto blanditiis commodi odit praesentium numquam modi laudantium autem, facere quae, ut esse repellat pariatur porro! Velit aperiam veritatis reprehenderit soluta? Enim temporibus mollitia voluptatibus tempora voluptatum necessitatibus delectus doloribus, repudiandae laboriosam incidunt similique vitae omnis recusandae accusantium, obcaecati, at aliquam tempore. Possimus dicta, et impedit veniam asperiores culpa non odio accusantium facilis, id, harum repellendus ipsa explicabo neque ab cum. Iure optio repudiandae mollitia. Accusantium provident quos ipsa suscipit quo doloremque! Culpa maxime labore, voluptas eaque vero natus neque quaerat fugiat adipisci? Sint, aspernatur reiciendis. Fugiat labore omnis similique neque quasi natus non voluptatum ducimus dicta dignissimos exercitationem aperiam consequuntur enim est nulla placeat, nemo sint ab ex? Officiis, laboriosam delectus! Consequuntur numquam nam rerum eligendi facere! Impedit quia culpa dolorem animi sunt dolore quas velit nobis omnis necessitatibus dolores deleniti itaque suscipit tenetur fugit iusto, reiciendis beatae quisquam voluptates rem commodi. Vero atque perferendis modi deserunt harum? Error omnis voluptas ea nesciunt inventore deserunt. Obcaecati sequi aliquam atque incidunt, nam, velit harum quis perspiciatis id quisquam similique exercitationem nisi. Optio dolores, magni velit repellendus illo distinctio aperiam rerum possimus. Repellat et sequi eligendi quasi assumenda dolorum, molestiae reiciendis eos architecto obcaecati quia omnis vel asperiores vitae quidem. Quis, quisquam sunt temporibus ducimus sint vel modi ex magnam! Voluptates dolores ullam corrupti veritatis earum nulla, ut officiis laborum. Id pariatur mollitia illum animi expedita at iure! Nulla nihil voluptatem iusto repellat autem corporis odit commodi unde voluptate quo sint maiores, sapiente reiciendis, sit quod atque dicta voluptas rem eligendi provident nostrum assumenda error. Non, maxime exercitationem. Cumque illo vero earum eligendi dicta distinctio incidunt. Minima enim reiciendis, excepturi perspiciatis molestiae mollitia illo fugit optio culpa eos architecto saepe. Autem commodi numquam adipisci tempora quod eaque praesentium a, quibusdam et doloremque unde optio, vitae harum nisi eius quaerat. Cumque dignissimos modi voluptatum similique, odit assumenda optio illum rerum suscipit nam quasi veritatis pariatur, qui veniam laborum nemo facere voluptas ea eligendi tenetur ratione culpa eos temporibus. Accusamus fuga temporibus tempore porro doloribus a ex praesentium hic suscipit aliquam, delectus assumenda velit ducimus vero voluptatibus modi eaque magnam cupiditate inventore sint, quaerat sed quos fugiat? Ullam recusandae dolor ipsum ut, alias eos sint ad cumque eum sed. Provident officia et, iusto accusantium quos nesciunt eius non ad eligendi libero quae dignissimos nostrum magnam error eos? Tenetur fugiat optio enim? Ab non quod, eaque laudantium voluptas quibusdam facere est in a sunt aspernatur vitae quisquam nesciunt ut voluptatibus? Excepturi non corrupti voluptatem nisi nemo? Beatae illo, reiciendis amet accusamus sed incidunt laborum labore recusandae cum eius distinctio dolore. Molestiae quo quaerat vitae temporibus, deserunt hic vel debitis earum minima est cum adipisci autem voluptate repellat nihil nobis praesentium error ut! Nam, excepturi. Fuga consequuntur dolore vero! Nostrum error blanditiis nam. Officiis ipsa inventore minima rem vel repellendus aspernatur. Suscipit officiis fugit, sequi veritatis rem fugiat quae iste aspernatur laboriosam harum?"
    )
    expect(comments?.valid).toBeFalse();
  });

  it('should check if required validator works', () => {
    const nameControl = component.form.get('name')
    const email = component.form.get('email')
    const rating = component.form.get('rating')
    const comments = component.form.get('rating')
    nameControl?.setValue('asd')
    email?.setValue('asd@asd')
    rating?.setValue('2')
    comments?.setValue('asd asd asd')
    expect(nameControl?.valid).toBeTruthy();
    expect(email?.valid).toBeTruthy();
    expect(rating?.valid).toBeTruthy();
    expect(comments?.valid).toBeTruthy();
  });

  it('DisableCreate set to true disables the submit button', () => {
    component.form.get('name')?.setValue('asd')
    component.form.get('email')?.setValue('asd@asd')
    component.form.get('rating')?.setValue('2')
    expect(component.form.valid).toBeTruthy()
  });

  it('DisableCreate set to true disables the submit button', () => {
    component.form.get('name')?.setValue('as')
    component.form.get('email')?.setValue('asdasd')
    component.form.get('rating')?.setValue('')
    expect(component.form.valid).toBeFalsy()
  });

});