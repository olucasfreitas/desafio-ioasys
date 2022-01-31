import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BooksListPageComponent } from './books-list-page.component';

describe('BooksListPageComponent', () => {
  let component: BooksListPageComponent;
  let fixture: ComponentFixture<BooksListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksListPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
