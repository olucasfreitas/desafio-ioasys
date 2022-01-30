import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = `${environment.apiBaseUrl}/auth`;
  private currentUser = new User();
  private currentUserSubject = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) {}

  setCurrentUser(value: User): void {
    this.currentUser = value;
    this.currentUserSubject.next(value);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  signIn(email: string, password: string): Observable<any> {
    const user = { email, password };

    return this.http.post(`${this.url}/sign-in`, user, {
      observe: 'response',
    });
  }

  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authorization');
    localStorage.removeItem('refresh-token');
    this.currentUserSubject.next(new User());
  }

  authorizeRefreshToken(token: string): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.currentUser.authorizationToken}`,
      }),
    };
    return this.http.post<void>(`${this.url}/refresh-token`, token, httpOptions);
  }
}
