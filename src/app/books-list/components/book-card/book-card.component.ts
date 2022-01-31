import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../entities/book.entity';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() book: Book = new Book();
  @Input() authToken = '';

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    this.dialog.open(BookDetailsModalComponent, {
      height: '75%',
      width: '70%',
      disableClose: true,
      panelClass: 'my-outlined-dialog',
      data: {
        bookId: this.book.id,
        authToken: this.authToken,
      },
    });
  }
}
