import { TestBed } from '@angular/core/testing';

import { NbaService } from './nba.service';
import { ConsumeService } from './consume.service';
import { of } from 'rxjs';

describe('NbaService', () => {
  let service: NbaService;
  let consumeServiceSpy: jasmine.SpyObj<ConsumeService>;
  beforeEach(() => {
    consumeServiceSpy = jasmine.createSpyObj<ConsumeService>('ConsumeService',['httpGet']);
    consumeServiceSpy.httpGet.and.returnValue(of())
    TestBed.configureTestingModule({
      providers: [
        { provide: ConsumeService, useValue: consumeServiceSpy }
      ]
    });
    service = TestBed.inject(NbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
