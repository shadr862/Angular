import { Pipe, PipeTransform } from '@angular/core';
import { RoomDetails } from '../rooms';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

 transform(rooms: RoomDetails[], order: 'asc' | 'desc' = 'asc'): RoomDetails[] {
    if (!rooms || !Array.isArray(rooms)) return rooms;

    return rooms.sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }

}
