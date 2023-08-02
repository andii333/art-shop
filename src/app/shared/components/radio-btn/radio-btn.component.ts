import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio-btn',
  templateUrl: './radio-btn.component.html',
  styleUrls: ['./radio-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RadioBtnComponent implements OnInit {
  @Input() checked!:string;
  @Input() color = '#6A983C'
  constructor(private elem: ElementRef) {}
  ngOnInit(): void {
      this.elem.nativeElement.style.setProperty('--color', this.color);
  }
}
