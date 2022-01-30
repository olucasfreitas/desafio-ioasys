import { Component, OnInit } from '@angular/core';
import { User } from './login/entities/user.entity';
import { UserService } from './login/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user = new User();
  authToken = '';
  refreshToken = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const localUser = localStorage.getItem('currentUser');
    if (localUser) {
      this.user = JSON.parse(localUser);
      this.userService.setCurrentUser(this.user);
    }

    const localAuthToken = localStorage.getItem('authToken');
    if (localAuthToken) {
      this.authToken = JSON.parse(localAuthToken);
      this.userService.setAuthorizationToken(this.authToken);
    }
  }
}
