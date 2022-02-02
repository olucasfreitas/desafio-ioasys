import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const localUser = localStorage.getItem('currentUser');
    const authToken = localStorage.getItem('authorization');
    const refreshToken = localStorage.getItem('refresh-token');

    if (localUser) {
      const user = {
        ...JSON.parse(localUser),
        authToken,
        refreshToken,
      };
      this.userService.setCurrentUser(user);
      this.router.navigate(['/books-list']);
    }
  }
}
