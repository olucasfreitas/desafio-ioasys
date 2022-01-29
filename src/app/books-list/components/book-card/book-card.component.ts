import { Component, OnInit } from '@angular/core';
import { Book } from '../../entities/book.entity';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  book: Book = new Book();

  constructor() {}

  ngOnInit(): void {}
}
