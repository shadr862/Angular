import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hinv-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  title = '';
  constructor() {}

  ngOnInit(): void {
    // Initialization logic can go here
  }

}
