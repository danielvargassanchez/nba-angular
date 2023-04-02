import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConsumeService } from './consume.service';
import { ObservableService } from './observable.service';
import { Observable } from 'rxjs';

describe('ConsumeService', () => {
  let service: ConsumeService;
  let observableServiceSpy: jasmine.SpyObj<ObservableService>;
  beforeEach(() => {
    observableServiceSpy = jasmine.createSpyObj<ObservableService>('ObservableService', ['setIsLoading']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: ObservableService, useValue: observableServiceSpy },
      ]
    });
    service = TestBed.inject(ConsumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create get observable',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const obs = service.httpGet<any>('http://localhost');
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe(res => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('GET');

      req.flush({});
    })
  );

  it('should create get observable with params and headers',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const obs = service.httpGet<any>('http://localhost', { param: 1 }, { header: 1 });
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe(res => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost?param=1');
      expect(req.request.method).toEqual('GET');

      req.flush({});
    })
  );

  it('should create post observable',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const obs = service.httpPost<any>('http://localhost', {});
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe(res => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('POST');

      req.flush({});
    })
  );

  it('should create post observable with params and headers',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const obs = service.httpPost<any>('http://localhost', { param: 1 }, { header: 1 });
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe(res => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('POST');

      req.flush({});
    })
  );

  it('should create put observable',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const obs = service.httpPut<any>('http://localhost', {});
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe(res => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('PUT');

      req.flush({});
    })
  );

  it('should create put observable with params and headers',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const obs = service.httpPut<any>('http://localhost', { param: 1 }, { header: 1 });
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe(res => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('PUT');

      req.flush({});
    })
  );

  it('should create get observable with error',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const obs = service.httpGet<any>('http://localhost');
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe(() => {
      }, err => {
        expect(err).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('GET');

      req.error(new ErrorEvent('err'));
    })
  );

  it('should create post observable',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const obs = service.httpPost<any>('http://localhost', {});
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe(() => {
      }, err => {
        expect(err).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('POST');

      req.error(new ErrorEvent('err'));
    })
  );

  it('should create put observable',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const obs = service.httpPut<any>('http://localhost', {});
      expect(obs instanceof Observable).toBeTruthy();
      obs.subscribe(() => {
      }, err => {
        expect(err).toBeDefined();
      });

      const req = httpMock.expectOne('http://localhost');
      expect(req.request.method).toEqual('PUT');

      req.error(new ErrorEvent('err'));
    })
  );
});
