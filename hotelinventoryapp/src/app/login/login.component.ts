import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HoverDirective } from '../directives/hovar-for-login/hover.directive';
import { EmailvalidatorDirective } from '../directives/drective-for-email/emailvalidator.directive';

@Component({
  selector: 'hinv-login',
  imports: [FormsModule, CommonModule, HoverDirective,EmailvalidatorDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email!:string;
  password!:string;

  Login()
  {
    if(this.email=='admin@gmail.com' && this.password=='Admin')
    {
      alert('sucessfully login');
    }
  }

}
