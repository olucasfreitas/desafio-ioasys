export class Book {
  id = '';
  title = '';
  description = '';
  authors: string[] = [''];
  pageCount = '';
  category = '';
  imageUrl = '';
  isbn10 = '';
  isbn13 = '';
  language = '';
  publisher = '';
  published = 0;
}

export class BooksResponse {
  data: Book[] = [];
  page = 1;
  totalItems = 0;
  totalPages = 0;
}

export class ModalBookInfo {
  bookId = '';
  authToken = '';
}
