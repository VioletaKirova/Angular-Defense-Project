import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  get isAuth() {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  logout() {
    this.authService.logout();
  }
}
