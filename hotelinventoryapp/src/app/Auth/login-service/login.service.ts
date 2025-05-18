import { Injectable } from '@angular/core';
import { UserSignup } from '../signup/signup.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedin = false;
  isloggedinAdmin = false;
  isloggedinManager = false;
  username: string = '';


  constructor(private http: HttpClient) { }


  /*  
  Login(User: any): void {
  
    this.http.post<any>('https://localhost:44348/api/Auth/login', User).subscribe({
      next: (res) => {
        this.username = res.username;
        this.isloggedinAdmin = res.role === 'Admin';
        this.isloggedinManager = res.role === 'Manager';
        this.message = res.message;
        this.isLoggedin = true;
        console.log('Login successful:', res);
      },
      error: (err) => {
        this.isLoggedin = false;
        this.message = err.error?.message || 'Login failed';
        console.error('Login failed:', err);
      }
    });
  }
    
  */

  Login(user: any) {
    return this.http.post<any>('https://localhost:44348/api/Auth/login', user);
  }


  SingUp(User: UserSignup) {
    return this.http.post<{ message: string }>('https://localhost:44348/api/Auth/signup', User);
  }
}
