import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InitService {
  config: any;

  constructor(private http: HttpClient) { }

  Init(): Observable<any> {
    return this.http.get('/assets/config.json').pipe(tap((config) => (this.config = config)))
  }
}
