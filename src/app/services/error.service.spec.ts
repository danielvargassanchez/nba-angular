import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';
import { DialogService } from './dialog.service';
import { DialogConfiguration } from '../models/dialog.model';

describe('ErrorService', () => {
  let service: ErrorService;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  
  beforeEach(() => {
    dialogServiceSpy = jasmine.createSpyObj<DialogService>('DialogService',['open','close']);
    TestBed.configureTestingModule({
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy }
      ]
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should error', ()=> {
    expect(service.error({
      message: 'error'
    }));
    expect(dialogServiceSpy.open).toHaveBeenCalled();
  })
});
