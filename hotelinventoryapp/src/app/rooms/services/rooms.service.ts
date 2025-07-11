import { Inject, Injectable } from '@angular/core';
import { RoomDetails } from '../rooms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';  // Adjust path
import { AppConfig } from '../../AppConfig/appconfig.interface'; // Adjust path
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Ensures global availability
})
export class RoomsService {
  getRoom$!: Observable<RoomDetails[]>;

  header=new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here'
  })

  

  
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private httpClient: HttpClient) {
    //console.log('Room Service is created');
    console.log(this.config.apiEndpoint);  // This should now log the apiEndpoint value from the environment
    this.getRoom$ = this.httpClient.get<RoomDetails[]>('/api/Rooms',{headers:this.header}).pipe(
      shareReplay(1) 
    );
  }
//refeesh the page
private refreshNeeded$ = new BehaviorSubject<void>(undefined);

get refreshNeeded() {
  return this.refreshNeeded$.asObservable();
}

triggerRefresh() {
  this.refreshNeeded$.next();
}
  


  getRoomList() {
    
    return this.httpClient.get<RoomDetails[]>('/api/Rooms',{headers:this.header});  // Adjust API endpoint if needed
  }

  addRoom(room: RoomDetails) {
    return this.httpClient.post<RoomDetails[]>('/api/Rooms', room);
  }

  editRoom(room: RoomDetails) {
    return this.httpClient.put<RoomDetails[]>('/api/Rooms', room);
  }
  deleteRoom(ID: any) {
    return this.httpClient.delete(`/api/Rooms?ID=${ID}`, ID);
  }

  getPhotos() {
    // dummy restApi from JSON Placeholder->photo
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      {
        reportProgress: true,
      }
    );

    return this.httpClient.request(request);



  }

}