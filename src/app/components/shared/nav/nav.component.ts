import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  get isAuth() {
    return this.authService.isAuthenticated;
  }
  get isAdmin() {
    return this.authService.isAdmin;
  }

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() { }

  logout() {
    this.authService.logout();
  }
}
