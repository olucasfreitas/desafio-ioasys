import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/login/entities/user.entity';
import { UserService } from 'src/app/login/services/user.service';
import { Book } from '../entities/book.entity';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-list-page',
  templateUrl: './books-list-page.component.html',
  styleUrls: ['./books-list-page.component.scss'],
})
export class BooksListPageComponent implements OnInit {
  bookList: Book[] = [];

  page = 1;
  lastPage = 0;
  amount = 12;
  category = 'biographies';

  user = new User();

  isMobile = false;

  constructor(private userService: UserService, private router: Router, private booksService: BooksService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((value) => {
      this.user = value;
    });
    this.booksService
      .getBooks(this.page, this.amount, this.category, this.user.authorizationToken)
      .subscribe((books) => {
        this.bookList = books.data;
        this.lastPage = Math.ceil(books.totalPages * Math.pow(10, 0)) / Math.pow(10, 0);
      });
  }

  goToNextPage(): void {
    if (this.page + 1 > this.lastPage) {
      return;
    } else {
      this.booksService
        .getBooks(this.page + 1, this.amount, this.category, this.user.authorizationToken)
        .subscribe((books) => {
          this.bookList = books.data;
          this.page = books.page;
        });
    }
  }

  goToPreviousPage(): void {
    if (this.page - 1 == 0) {
      return;
    } else {
      this.booksService
        .getBooks(this.page - 1, this.amount, this.category, this.user.authorizationToken)
        .subscribe((books) => {
          this.bookList = books.data;
          this.page = books.page;
        });
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

  signOut(): void {
    this.userService.signOut();
    this.router.navigate(['/login']);
  }
}
