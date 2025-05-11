import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HoverDirective } from '../directives/hovar-for-login/hover.directive';
import { EmailvalidatorDirective } from '../directives/directive-for-email/emailvalidator.directive';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { LoginService } from './login-service/login.service';

@Component({
  selector: 'hinv-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HoverDirective, EmailvalidatorDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private router: Router,
    private config: ConfigService,
    private loginService: LoginService) { }

  Login() {
    
    if (this.loginService.Login(this.email, this.password)) {
      // Navigate after a short delay
      setTimeout(() => {
        this.router.navigateByUrl('/ds');
      }, 100);

      alert('Successfully logged in');

    }
  }

}
