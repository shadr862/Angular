import { Component } from '@angular/core';
import { RoomsComponent } from "./rooms/rooms.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RoomsComponent,CommonModule],
  standalone: true,
})
export class AppComponent {
  title = 'hotelinventoryapp';
  role = 'admin'; 
}
