import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  incorrectInfo = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    const subscriber = this.userService.signIn(email, password).subscribe({
      next: (data) => {
        const authToken = data.headers.get('authorization');
        const refreshToken = data.headers.get('refresh-token');
        const user: User = {
          id: data.body.id,
          name: data.body.name,
          email: data.body.email,
          birthDate: data.body.birthDate,
          gender: data.body.gender,
          authorizationToken: authToken,
          refreshToken: refreshToken,
        };

        this.userService.setCurrentUser(user);

        localStorage.setItem('currentUser', JSON.stringify(data.body));
        localStorage.setItem('authorization', authToken);
        localStorage.setItem('refresh-token', refreshToken);
        this.router.navigate(['/books-list']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.incorrectInfo = true;
        }
      },
    });

    subscriber.unsubscribe();
  }
}
