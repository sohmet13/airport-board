import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'filter'})
export class FilterPipe implements PipeTransform {
  transform(array: any, property: string, value: any) {
    if (property == null || value == null) {
      return array;
    }
    return array.filter(item => item[property] === value);
  }
}
