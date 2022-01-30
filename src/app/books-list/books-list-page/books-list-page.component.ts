import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/login/entities/user.entity';
import { UserService } from 'src/app/login/services/user.service';
import { Book } from '../entities/book.entity';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-list-page',
  templateUrl: './books-list-page.component.html',
  styleUrls: ['./books-list-page.component.scss'],
})
export class BooksListPageComponent implements OnInit, OnDestroy {
  bookList: Book[] = [];

  page = 1;
  lastPage = 0;
  amount = 12;
  category = 'biographies';

  user = new User();
  authToken = '';

  isMobile = false;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private booksService: BooksService) {}

  ngOnInit(): void {
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }

  setSubscriptions(): void {
    this.subscriptions.push(
      this.getUserSubscription(),
      this.getAuthorizationSubscription(),
      this.getBooksSubscription(),
    );
  }

  getUserSubscription(): Subscription {
    return this.userService.getCurrentUser().subscribe((value) => {
      this.user = value;
    });
  }

  getAuthorizationSubscription(): Subscription {
    return this.userService.getAuthorizationToken().subscribe((value) => {
      this.authToken = value;
    });
  }

  getBooksSubscription(): Subscription {
    this.isLoading = true;
    return this.booksService.getBooks(this.page, this.amount, this.category, this.authToken).subscribe((books) => {
      this.bookList = books.data;
      this.lastPage = Math.ceil(books.totalPages * Math.pow(10, 0)) / Math.pow(10, 0);
      this.isLoading = false;
    });
  }

  goToNextPage(): void {
    if (this.page + 1 > this.lastPage) {
      return;
    } else {
      this.isLoading = true;
      this.booksService.getBooks(this.page + 1, this.amount, this.category, this.authToken).subscribe((books) => {
        this.bookList = books.data;
        this.page = books.page;
        this.isLoading = false;
      });
    }
  }

  goToPreviousPage(): void {
    if (this.page - 1 == 0) {
      return;
    } else {
      this.isLoading = true;
      this.booksService.getBooks(this.page - 1, this.amount, this.category, this.authToken).subscribe((books) => {
        this.bookList = books.data;
        this.page = books.page;
        this.isLoading = false;
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
  }
}
