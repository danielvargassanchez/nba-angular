import { Injectable } from '@angular/core';
import { DialogService } from './dialog.service';
import { DialogConfiguration } from '../models/dialog.model';
import { IErrorHttp } from '../models/error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private dialogService: DialogService) { }

  error(error: IErrorHttp): void {
    this.dialogService.open(this.getDialogConfig(error.message ?? ""));
  }
  private getDialogConfig(message: string): DialogConfiguration {
    const config = new DialogConfiguration();
    config.message = `<p>${message}</p>`;
    config.actions = [
      {
        action: () => { this.dialogService.close() },
        message: 'Acept',
        styles: 'primary'
      }
    ]
    return config;
  }
}
