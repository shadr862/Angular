import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedin = false;
  isloggedinAdmin=false;
  username:string|null='';

  constructor() { }
  
  Login(email: string, password: string) {
    if (email === 'admin@gmail.com' && password === 'Admin') {
      //localStorage.setItem('token', 'mock-token');
      //localStorage.setItem('username', 'Admin');
      this.username=email.split('@')[0];
      this.isLoggedin = true;
      this.isloggedinAdmin=true;
    }
    if (email === 'user@gmail.com' && password === 'User') {
      this.username=email.split('@')[0];
      this.isLoggedin = true;
      this.isloggedinAdmin=false;
    }

    return this.isLoggedin;
  }
}
