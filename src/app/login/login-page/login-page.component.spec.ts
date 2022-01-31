import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../entities/user.entity';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
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

  it('should create', () => {
    localStorage.setItem('currentUser', JSON.stringify(new User()));
    router.navigate = jasmine.createSpy().and.resolveTo({});
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
