import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DialogConfiguration } from '../models/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  private loading$ = new Subject<boolean>();
  constructor() { }
  setIsLoading(isLoading: boolean): void {
    this.loading$.next(isLoading);
  }
  getIsLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
