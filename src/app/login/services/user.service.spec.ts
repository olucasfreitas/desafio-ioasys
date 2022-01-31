import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../entities/user.entity';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const store: any = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return store[key] || null;
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });
  it('should log user in', () => {
    const user = {
      email: 'test@mail.com',
      password: 'testeee',
    };
    const expectedUser = new User();

    userService.signIn(user.email, user.password).subscribe((data: any) => expect(data.body).toEqual(expectedUser));

    const req = httpTestingController.expectOne(`${userService.url}/sign-in`);
    expect(req.request.method).toEqual('POST');

    req.flush(expectedUser);
  });

  it('should authorize refresh_token', () => {
    userService.authorizeRefreshToken('token').subscribe((data: any) => expect(data).toEqual('token'));

    const req = httpTestingController.expectOne(`${userService.url}/refresh-token`);
    expect(req.request.method).toEqual('POST');

    req.flush('token');
  });

  it('should sign user out', () => {
    userService.signOut();
    expect(userService.currentUser).toEqual(new User());
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(localStorage.getItem('authorization')).toBeNull();
    expect(localStorage.getItem('refresh-token')).toBeNull();
  });

  it('should set currentUser', () => {
    userService.setCurrentUser(new User());
    expect(userService.currentUser).toEqual(new User());
    expect(userService.currentUserSubject.value).toEqual(new User());
  });

  it('should return currentUser', () => {
    userService.getCurrentUser().subscribe((user) => {
      expect(user).toEqual(new User());
    });
  });
});
