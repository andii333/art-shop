import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'numberPhone'
})
export class NumberPhonePipe implements PipeTransform {

  transform(numberPhone: string): string {

    return numberPhone.toString()
      .replace(/(380|^80|^0|\D0|\D)/gi, "")
      .replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "+380 ($1) $2-$3-$4");
  }
}
