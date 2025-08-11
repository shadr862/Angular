import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-binding',
  imports: [CommonModule,FormsModule],
  templateUrl: './binding.html',
  styleUrl: './binding.scss'
})
export class Binding {
   title = 'Angular Bindings Example';
  name = 'John Doe';
  message = '';

  onButtonClick() {
    this.message = `Hello, ${this.name}! Button clicked at ${new Date().toLocaleTimeString()}`;
  }

}
