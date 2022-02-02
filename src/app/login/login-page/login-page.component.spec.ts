import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../entities/user.entity';
import { LoginPageComponent } from './login-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services/user.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: jasmine.SpyObj<Router>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['setCurrentUser']);

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    const store: any = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return (store[key] = <string>value);
    });
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userService.setCurrentUser.and.returnValue();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if user is already logged in', () => {
    const user = new User();
    user.authorizationToken = 'teste';
    user.refreshToken = 'teste';
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authorization', user.authorizationToken);
    localStorage.setItem('refresh-token', user.refreshToken);
    router.navigate = jasmine.createSpy().and.resolveTo({});
    userService.setCurrentUser.and.returnValue();
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
