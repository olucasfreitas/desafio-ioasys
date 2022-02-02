import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormComponent } from './form.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['signIn', 'setCurrentUser']);

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userService.signIn.and.returnValue(of(new HttpResponse<any>()));
    userService.setCurrentUser.and.returnValue();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign user in and define items on storage', () => {
    const data = new HttpResponse<any>();
    data.headers.append('authorization', 'teste');
    data.headers.append('refresh-token', 'teste');
    userService.signIn.and.returnValue(of(data));
    component.onSubmit();

    expect(userService.signIn).toHaveBeenCalled();
  });
});
