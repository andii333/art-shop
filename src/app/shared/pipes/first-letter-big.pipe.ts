import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterBig'
})
export class FirstLetterBigPipe implements PipeTransform {
  transform(value: string): string {
   value = value.charAt(0).toUpperCase() + value.slice(1);
    return value;
  }

}
