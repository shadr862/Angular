import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login-service/login.service';
import { EmailvalidatorDirective } from '../../directives/directive-for-email/emailvalidator.directive';
import { HoverDirective } from '../../directives/hovar-for-login/hover.directive';
import { ConfigService } from '../../services/config.service';
import { UserSignup } from '../signup/signup.component';

@Component({
  selector: 'hinv-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HoverDirective, EmailvalidatorDirective, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  Model: UserSignup = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  message: string = '';

  constructor(private router: Router,
    private config: ConfigService,
    private loginService: LoginService) { }


  Login() {
    this.loginService.Login(this.Model).subscribe({
      next: (res) => {
        // Update the login status and details
        this.loginService.isLoggedin = true;

        this.loginService.username = res.username;
        this.loginService.isloggedinAdmin = res.role === 'Admin';
        this.loginService.isloggedinManager = res.role === 'Manager';
        this.message = res.message;

        // ✅ Now safely navigate
        setTimeout(()=>{
          this.router.navigateByUrl('/ds');
        },300)
      },
      error: (err) => {

        this.loginService.isLoggedin = false;
        this.message = err.error?.message || 'Login failed';
        
        console.error('Login failed:', err);
      }
    });
  }

  /*
   2nd way of checking
   Login() {
   this.loginService.Login(this.Model);
   // Wait a bit and check later (NOT recommended, but if you insist)
   setTimeout(() => {
     this.message = this.loginService.message;
     if (this.loginService.isLoggedin) {
       this.router.navigateByUrl('/ds');
     }
   }, 500); // give enough time for request to complete
 }
 */


}
