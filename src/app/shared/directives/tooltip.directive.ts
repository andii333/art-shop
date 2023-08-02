/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-toolTip]'
})
export class TooltipDirective implements OnChanges {

  @Input("app-toolTip") tooltip!: string | null;
  div = this.renderer2.createElement('div')
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { this.renderer2.addClass(this.div, "test-tooltip"); }
 
  
  ngOnChanges(): void {
    this.renderer2.addClass(this.div, "tooltip-div");
    this.elementRef.nativeElement.style.position = 'relative'
    this.div.innerHTML = this.tooltip;
    this.renderer2.appendChild(this.elementRef.nativeElement, this.div);
  }
  
  @HostListener("mouseenter", ['$event.screenX', '$event.screenY', '$event.clientX', '$event.clientY'])
  onEnter(coordScreenX: number, coordScreenY: number, coordElementX: number, coordElementY: number) {
    if ((coordScreenY / 3) > coordElementY) { this.div.style.bottom = '2rem' }
    if ((coordScreenX / 3) < coordElementX) { this.div.style.right = '2rem' }
    this.renderer2.addClass(this.div, "tooltip-show");
  }

  @HostListener("mouseleave")
  onLeave() {
    this.renderer2.removeClass(this.div, "tooltip-show");
  }
}
