import { Pipe, PipeTransform } from '@angular/core';
import { BookingDetailsGet } from '../booking';
import { filter } from 'rxjs';

@Pipe({
  name: 'searchBookList'
})
export class SearchBookListPipe implements PipeTransform {

  transform(Book: BookingDetailsGet[], name: string): BookingDetailsGet[] {
    const val=name.toLocaleLowerCase();
    return Book.filter(b => b.guestName.toLocaleLowerCase().includes(val));
  }

}
