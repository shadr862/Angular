import { Pipe, PipeTransform } from '@angular/core';
import { RoomDetails } from '../rooms';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(rooms:RoomDetails[], roomtype: string): RoomDetails[] {
    if (!rooms || !roomtype) return rooms;

    const lowerTerm = roomtype.toLowerCase();
    return rooms.filter(item =>
      item.roomtype.toLowerCase().includes(lowerTerm)
    );
   
  }

}
