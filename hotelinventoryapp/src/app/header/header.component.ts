import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'hinv-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  standalone:true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  title = '';
  constructor() {
    
  }
  ngOnInit(): void {
  
  }

}
