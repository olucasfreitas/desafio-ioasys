import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = `${environment.apiBaseUrl}/auth`;
  authorizationToken = '';
  private authorizationTokenSubject = new BehaviorSubject<string>(this.authorizationToken);
  refreshToken = '';
  private refreshTokenSubject = new BehaviorSubject<string>(this.refreshToken);
  private currentUser = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient, private router: Router) {}

  setCurrentUser(value: User): void {
    return this.currentUser.next(value);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  setAuthorizationToken(value: string): void {
    this.authorizationToken = value;
    return this.authorizationTokenSubject.next(value);
  }

  getAuthorizationToken(): Observable<string> {
    return this.authorizationTokenSubject.asObservable();
  }

  setRefreshToken(value: string): void {
    this.refreshToken = value;
    return this.refreshTokenSubject.next(value);
  }

  getRefreshToken(): Observable<string> {
    return this.refreshTokenSubject.asObservable();
  }

  signIn(email: string, password: string): Observable<User> {
    const user = { email, password };

    return this.http
      .post(`${this.url}/sign-in`, user, {
        headers: new HttpHeaders({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          authorization: this.authorizationToken,
        }),
        observe: 'response',
      })
      .pipe(
        map((res) => {
          const authToken = JSON.stringify(res.headers.get('Authorization'));
          const refreshToken = JSON.stringify(res.headers.get('refresh-token'));

          localStorage.setItem('authToken', authToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('currentUser', JSON.stringify(res.body));

          this.currentUser.next(res.body as User);
          this.authorizationTokenSubject.next(authToken);
          this.refreshTokenSubject.next(refreshToken);

          this.router.navigate(['/books-list']);

          return res.body as User;
        }),
      );
  }

  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUser.next(new User());
    this.router.navigate(['/login']);
  }

  authorizeRefreshToken(token: string): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: this.authorizationToken,
      }),
    };
    return this.http.post<void>(`${this.url}/refresh-token`, token, httpOptions);
  }
}
