import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book, ModalBookInfo } from '../../entities/book.entity';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.scss'],
})
export class BookDetailsModalComponent implements OnInit {
  book = new Book();
  constructor(
    public dialogRef: MatDialogRef<BookDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public info: ModalBookInfo,
    private booksService: BooksService,
  ) {}

  ngOnInit(): void {
    this.booksService.getSpecificBook(this.info.bookId, this.info.authToken).subscribe((value) => {
      this.book = value;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
