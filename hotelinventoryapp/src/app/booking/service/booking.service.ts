import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  BookingDetailsGet } from '../booking';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  
  private refreshNeeded$ = new BehaviorSubject<void>(undefined);
  
  get refreshNeeded() {
    return this.refreshNeeded$.asObservable();
  }
  
  triggerRefresh() {
    this.refreshNeeded$.next();
  }

  AddBookroom(booking:any)
  {
    return this.http.post('https://localhost:44348/api/Booking',booking);
  }

  getBookroom()
  {
    return this.http.get<BookingDetailsGet[]>('https://localhost:44348/api/Booking');
  }

  deleteBookroom(ID:number)
  {
    const url=`https://localhost:44348/api/Booking?id=${ID}`;
    console.log(url);
    return this.http.delete<BookingDetailsGet[]>(url)
  }

  updateBookroom(book:BookingDetailsGet)
  {
    return this.http.put<BookingDetailsGet[]>('https://localhost:44348/api/Booking',book);
  }
}
