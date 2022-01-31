import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BookDetailsModalComponent } from './book-details-modal.component';
import { BooksService } from '../../services/books.service';
import { Book } from '../../entities/book.entity';
import { of } from 'rxjs';

describe('BookDetailsModalComponent', () => {
  let component: BookDetailsModalComponent;
  let fixture: ComponentFixture<BookDetailsModalComponent>;
  let booksService: jasmine.SpyObj<BooksService>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const booksServiceSpy = jasmine.createSpyObj('BooksService', ['getSpecificBook']);
    await TestBed.configureTestingModule({
      declarations: [BookDetailsModalComponent],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { data: MAT_DIALOG_DATA } },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: BooksService, useValue: booksServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsModalComponent);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService) as jasmine.SpyObj<BooksService>;
    booksService.getSpecificBook.and.returnValue(of(new Book()));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load book on init', () => {
    booksService.getSpecificBook.and.returnValue(of(new Book()));
    component.ngOnInit();
    expect(booksService.getSpecificBook).toHaveBeenCalled();
    expect(component.book).toEqual(new Book());
  });

  it('should close modal', () => {
    component.close();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
