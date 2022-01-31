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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const localUser = localStorage.getItem('currentUser');
    const authToken = localStorage.getItem('authorization');
    const refreshToken = localStorage.getItem('refresh-token');

    if (localUser) {
      this.user = JSON.parse(localUser);
      this.user.authorizationToken = authToken as string;
      this.user.refreshToken = refreshToken as string;
      this.userService.setCurrentUser(this.user);
    }
  }
}
