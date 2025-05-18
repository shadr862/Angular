import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login-service/login.service';
import { EmailvalidatorDirective } from '../../directives/directive-for-email/emailvalidator.directive';
import { HoverDirective } from '../../directives/hovar-for-login/hover.directive';

@Component({
  selector: 'hinv-signup',
  imports: [CommonModule, FormsModule, RouterModule, EmailvalidatorDirective,HoverDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  successMessage: any;

  @ViewChild('signupForm') signupForm!: NgForm;

  constructor(private loginSerVice: LoginService) { }

  Model: UserSignup = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  SignUp() {

    this.loginSerVice.SingUp({
      userName: this.Model.email.split('@')[0],
      email: this.Model.email,
      password: this.Model.password,
      confirmPassword: this.Model.confirmPassword,
      role: this.Model.role

    }).subscribe({
      next: (res) => {
        this.successMessage = res.message; 
        this.signupForm.resetForm();
      },
      error: (err) => {
        console.error('Signup failed:', err.message);
      }
    })
  }

}

export interface UserSignup {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'Admin' | 'Customer' | 'Guest' | 'Manager' | '';
}

