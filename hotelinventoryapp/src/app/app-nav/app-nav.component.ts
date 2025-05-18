import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule,} from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../Auth/login-service/login.service';

@Component({
  selector: 'hinv-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterModule,
    CommonModule
  ]
})
export class AppNavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    constructor(private router:Router,private loginService:LoginService){}

    username:string|null='';
    ngOnInit(): void {
    // Retrieve username from localStorage
    this.username = this.loginService.username;
  }

  logout() {
    this.loginService.isLoggedin=false;
    this.loginService.username='';
    this.router.navigate(['/login']);
  }
}
