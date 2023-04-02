import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ObservableService } from './services/observable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  constructor(
    private spinner: NgxSpinnerService,
    private observablService: ObservableService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.observablService.getIsLoading().subscribe((isLoading) => {
        this.manageLoading(isLoading);
      })
    );
  }
  manageLoading(isLoading: boolean): void {
    if (isLoading) {
      this.spinner.show();
      return;
    }
    this.spinner.hide();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
