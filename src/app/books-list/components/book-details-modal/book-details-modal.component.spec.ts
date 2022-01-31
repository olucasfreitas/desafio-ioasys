import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BookDetailsModalComponent } from './book-details-modal.component';

describe('BookDetailsModalComponent', () => {
  let component: BookDetailsModalComponent;
  let fixture: ComponentFixture<BookDetailsModalComponent>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      declarations: [BookDetailsModalComponent],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { data: MAT_DIALOG_DATA } },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    component.close();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
