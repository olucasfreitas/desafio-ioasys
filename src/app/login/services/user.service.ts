import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = `${environment.apiBaseUrl}/auth`;
  authorization =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWM5YzI5MGNjNDk4YjVjMDg4NDVlMGEiLCJ2bGQiOjE2NDM0OTQ5NTI3MzUsImlhdCI6MTY0MzQ5ODU1MjczNX0.6U5FU__-xJMGPXkH4m1BEVC4hGXIS3jB3qmlLhJ2Qrs';

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<User> {
    const user = { email, password };
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: this.authorization,
      }),
    };
    return this.http.post<User>(`${this.url}/sign-in`, user, httpOptions);
  }

  generateNewToken(token: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: this.authorization,
      }),
    };
    return this.http.post<string>(`${this.url}/refresh-token`, token, httpOptions);
  }
}
