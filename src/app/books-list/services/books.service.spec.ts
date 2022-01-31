import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BooksService } from './books.service';
import { Book, BooksResponse } from '../entities/book.entity';

describe('BooksService', () => {
  let booksService: BooksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpTestingController = TestBed.inject(HttpTestingController);
    booksService = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(booksService).toBeTruthy();
  });

  it('Should GET all the books from a category', () => {
    const expected = new BooksResponse();
    booksService.getBooks(1, 1, 'biographies', 'token').subscribe((data) => expect(data).toEqual(expected));

    const req = httpTestingController.expectOne(`${booksService.url}?page=1&amount=1&category=biographies`);
    expect(req.request.method).toEqual('GET');

    req.flush(expected);
  });

  it('Should GET a specific book', () => {
    const expected = new Book();
    booksService.getSpecificBook('id', 'token').subscribe((data) => expect(data).toEqual(expected));

    const req = httpTestingController.expectOne(`${booksService.url}/id`);
    expect(req.request.method).toEqual('GET');

    req.flush(expected);
  });
});
