import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book, BooksResponse } from '../entities/book.entity';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url = `${environment.apiBaseUrl}/books`;

  constructor(private http: HttpClient) {}

  getBooks(page: number, amount: number, category: string, authToken: string): Observable<BooksResponse> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('amount', amount);
    params = params.append('category', category);

    return this.http.get<BooksResponse>(this.url, {
      params,
      headers: new HttpHeaders({
        authorization: `Bearer ${authToken}`,
      }),
    });
  }

  getSpecificBook(id: string, authToken: string): Observable<Book> {
    return this.http.get<Book>(`${this.url}/${id}`, {
      headers: new HttpHeaders({
        authorization: `Bearer ${authToken}`,
      }),
    });
  }
}
