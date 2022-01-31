import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
    const store: any = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return (store[key] = <string>value);
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set current user', () => {
    const user = {
      id: '',
      name: '',
      email: '',
      birthDate: '',
      gender: '',
      authorizationToken: 'dasdasdas',
      refreshToken: 'dasdasdas',
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authorization', user.authorizationToken);
    localStorage.setItem('refresh-token', user.refreshToken);

    component.ngOnInit();

    expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(user));
    expect(localStorage.getItem('authorization')).toEqual('dasdasdas');
    expect(localStorage.getItem('refresh-token')).toEqual('dasdasdas');
    expect(component.user).toEqual(user);
    expect(component.user.authorizationToken).toEqual('dasdasdas');
    expect(component.user.refreshToken).toEqual('dasdasdas');
  });
});
