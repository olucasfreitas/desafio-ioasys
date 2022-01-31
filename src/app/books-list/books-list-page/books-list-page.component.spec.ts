import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BooksListPageComponent } from './books-list-page.component';
import { UserService } from 'src/app/login/services/user.service';
import { BooksService } from '../services/books.service';
import { User } from 'src/app/login/entities/user.entity';
import { of } from 'rxjs';
import { BooksResponse } from '../entities/book.entity';
import { Router } from '@angular/router';

describe('BooksListPageComponent', () => {
  let component: BooksListPageComponent;
  let fixture: ComponentFixture<BooksListPageComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let booksService: jasmine.SpyObj<BooksService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['signOut', 'getCurrentUser']);
    const booksServiceSpy = jasmine.createSpyObj('BooksService', ['getBooks']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [BooksListPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: BooksService, useValue: booksServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListPageComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userService.signOut.and.returnValue();
    userService.getCurrentUser.and.returnValue(of(new User()));
    booksService = TestBed.inject(BooksService) as jasmine.SpyObj<BooksService>;
    booksService.getBooks.and.returnValue(of(new BooksResponse()));
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    const store: any = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return (store[key] = <string>value);
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user and load books', () => {
    localStorage.setItem('currentUser', JSON.stringify(new User()));
    userService.getCurrentUser.and.returnValue(of(new User()));
    component.ngOnInit();
    booksService.getBooks(1, 1, 'biographies', 'token').subscribe((books) => {
      expect(component.bookList).toEqual(books.data);
      expect(component.lastPage).toBeCloseTo(books.totalPages);
    });
    expect(component.user).toEqual(new User());
  });

  it('should go to next page', () => {
    component.lastPage = 4;
    component.page = 3;
    component.goToNextPage();
    booksService.getBooks(1, 1, 'biographies', 'token').subscribe((books) => {
      expect(component.bookList).toEqual(books.data);
      expect(component.page).toEqual(books.page);
    });
  });

  it('should come back to previous page', () => {
    component.lastPage = 4;
    component.page = 3;
    component.goToPreviousPage();
    booksService.getBooks(1, 1, 'biographies', 'token').subscribe((books) => {
      expect(component.bookList).toEqual(books.data);
      expect(component.page).toEqual(books.page);
    });
  });

  it('should sign user out', () => {
    router.navigate = jasmine.createSpy().and.resolveTo({});
    userService.signOut.and.returnValue();
    component.signOut();
    expect(userService.signOut).toHaveBeenCalled();
  });

  it('should test if screen is bigger then 440px', () => {
    component.setMatDrawerMode(750);
    expect(component.isMobile).toEqual(false);
  });
  it('should test if screen is smaller then 440px', () => {
    component.setMatDrawerMode(400);
    expect(component.isMobile).toEqual(true);
  });
  it('should scroll to the top of the page', () => {
    jasmine.clock().install();
    component.scrollTop();
    jasmine.clock().tick(100);
    expect(component.scroll.nativeElement.scrollTop).toEqual(0);
    jasmine.clock().uninstall();
  });
});
