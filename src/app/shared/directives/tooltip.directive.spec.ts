import { By } from '@angular/platform-browser';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: '<div class="test-tooltip" app-toolTip = "Basket is empty"></div>',
  selector: 'app-some'
})

class SomeComponent { }

describe('TooltipDirective', () => {

  let component: SomeComponent
  let fixture: ComponentFixture<SomeComponent>
  let el: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipDirective, SomeComponent]
    })

    fixture = TestBed.createComponent(SomeComponent)
    component = fixture.componentInstance
    el = fixture.debugElement.query(By.css('.test-tooltip'))
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Set in tooltip Basket is empty', () => {
    el.nativeElement.dispatchEvent(new Event('mouseenter'))
    fixture.detectChanges()
    const toolTip = el.query(By.css('.test-yytooltip'))
    expect(toolTip.nativeElement.innerText).toBe('Basket is empty')
  })

  it('toolTip should be hidden after mouseleave', fakeAsync(() => {
    el.nativeElement.dispatchEvent(new Event('mouseenter'))
    fixture.detectChanges()
    let toolTip = el.query(By.css('.tooltip-show'))
    expect(toolTip).toBeTruthy()

      el.nativeElement.dispatchEvent(new Event('mouseleave'))
      fixture.detectChanges()
    toolTip = el.query(By.css('.tooltip-show'))
    expect(toolTip).toBeFalsy()
  }))
});
