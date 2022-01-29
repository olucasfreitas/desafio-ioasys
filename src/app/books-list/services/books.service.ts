import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../entities/book.entity';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url = `${environment.apiBaseUrl}/books`;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }

  getSpecificBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.url}/${id}`);
  }
}
