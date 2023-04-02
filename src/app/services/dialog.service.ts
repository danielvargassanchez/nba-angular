import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DialogConfiguration } from '../models/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private display: Subject<boolean> = new Subject<boolean>();
  private config: Subject<DialogConfiguration> = new Subject<DialogConfiguration>();
  constructor() {
  }

  watch(): Observable<boolean> {
    return this.display.asObservable();
  }
  watchConfiguration(): Observable<DialogConfiguration> {
    return this.config.asObservable();
  }
  open(config: DialogConfiguration): void {
    this.config.next(config);
    this.display.next(true);
  }
  close(): void {
    this.display.next(false);
  }
}
