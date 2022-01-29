import { Component, HostListener, OnInit } from '@angular/core';
import { Book } from '../entities/book.entity';

@Component({
  selector: 'app-books-list-page',
  templateUrl: './books-list-page.component.html',
  styleUrls: ['./books-list-page.component.scss'],
})
export class BooksListPageComponent implements OnInit {
  books: Book[] = [];
  isMobile = false;

  constructor() {}

  ngOnInit(): void {
    this.addBooks();
  }

  addBooks() {
    for (let cont = 0; cont < 12; cont++) {
      const book = new Book();
      this.books.push(book);
    }
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  setMatDrawerMode(event: number): void {
    const windowSizeNow = event;

    if (windowSizeNow > 440) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  }
}
