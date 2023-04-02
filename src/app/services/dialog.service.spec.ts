import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { DialogConfiguration } from '../models/dialog.model';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should open', (done)=> {
    service.watch().subscribe((res) => {
      expect(res).toEqual(true);
      done();
    });
    service.open(new DialogConfiguration());
  });
  it('should open', (done)=> {
    service.watchConfiguration().subscribe((res) => {
      expect(res.message).toEqual('message test');
      done();
    });
    const config = new DialogConfiguration();
    config.message = 'message test';
    service.open(config);
  });
  it('should close', (done)=> {
    service.watch().subscribe((res) => {
      expect(res).toEqual(false);
      done();
    });
    service.close();
  });
});
