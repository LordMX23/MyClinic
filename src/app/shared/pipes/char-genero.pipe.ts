import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charGenero',
  standalone: true
})
export class CharGeneroPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return (value == 'M') ? 'Masculino' : 'Femenino';
  }

}
