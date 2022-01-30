import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.userService.signIn(email, password);
  }
}
