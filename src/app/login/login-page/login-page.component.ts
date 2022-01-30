import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      this.router.navigate(['/books-list']);
    }
  }
}
