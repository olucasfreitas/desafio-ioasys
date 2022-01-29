import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './login/components/form/form.component';
import { BookCardComponent } from './books-list/components/book-card/book-card.component';
import { BookDetailsModalComponent } from './books-list/components/book-details-modal/book-details-modal.component';
import { BooksListPageComponent } from './books-list/books-list-page/books-list-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    BookCardComponent,
    BookDetailsModalComponent,
    BooksListPageComponent,
    LoginPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ReactiveFormsModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
