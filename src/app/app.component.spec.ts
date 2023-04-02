import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockDialogComponent } from '../mocks/componentsMock';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ObservableService } from './services/observable.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AppComponent>;
  let spinnerSpy: jasmine.SpyObj<NgxSpinnerService>;
  let observablServiceSpy: jasmine.SpyObj<ObservableService>;
  beforeEach(async () => {
    spinnerSpy = jasmine.createSpyObj<NgxSpinnerService>('NgxSpinnerService', ['show', 'hide']);
    observablServiceSpy = jasmine.createSpyObj<ObservableService>('ObservableService', ['getIsLoading']);
    observablServiceSpy.getIsLoading.and.returnValue(of(true));
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxSpinnerModule
      ],
      declarations: [
        AppComponent,
        MockDialogComponent
      ],
      providers: [
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        { provide: ObservableService, useValue: observablServiceSpy },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should manageLoading with false', () => {
    component.manageLoading(false);
    expect(spinnerSpy.hide).toHaveBeenCalled();
  });
  it('should manageLoading with true', () => {
    component.manageLoading(true);
    expect(spinnerSpy.show).toHaveBeenCalled();
  });
});
