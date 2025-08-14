import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-project5',
  imports: [CommonModule],
  templateUrl: './project5.component.html',
  styleUrl: './project5.component.scss'
})
export class Project5Component {

  isMenuOpen = false;
  isMobile = false;

 
  checkScreen() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isMenuOpen = false; // reset menu on desktop
    }
  }

  ngOnInit() {
    this.checkScreen();
  }
}
