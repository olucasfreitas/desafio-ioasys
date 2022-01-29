import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../entities/book.entity';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.scss'],
})
export class BookDetailsModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BookDetailsModalComponent>, @Inject(MAT_DIALOG_DATA) public book: Book) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
