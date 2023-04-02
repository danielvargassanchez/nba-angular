import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription, merge, tap } from 'rxjs';
import { DialogConfiguration } from '../../models/dialog.model';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  display = false;
  configuration = new DialogConfiguration();
  constructor(private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.dialogService.watchConfiguration().subscribe((config) => {
        this.configuration = config
      })
    );
    this.subscriptions.add(
      this.dialogService.watch().subscribe((display) => {
        this.display = display
      })
    )
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
