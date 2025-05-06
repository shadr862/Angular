import { Inject, Injectable } from '@angular/core';
import { RoomDetails } from '../rooms';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';  // Adjust path
import { AppConfig } from '../../AppConfig/appconfig.interface'; // Adjust path
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Ensures global availability
})
export class RoomsService {

  getRoom$ : any;
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private httpClient: HttpClient) {
    //console.log('Room Service is created');
    //console.log(this.config.apiEndpoint);  // This should now log the apiEndpoint value from the environment
    this.getRoom$=this.httpClient.get<RoomDetails[]>('/api/Rooms').pipe(
      shareReplay(1)//if 
    )
  }
 


  getRoomList() {
    return this.httpClient.get<RoomDetails[]>('/api/Rooms');  // Adjust API endpoint if needed
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