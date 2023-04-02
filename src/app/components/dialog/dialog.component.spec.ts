import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { DialogService } from '../../services/dialog.service';
import { of } from 'rxjs';
import { DialogConfiguration } from '../../models/dialog.model';
import { MockDialogActionsComponent, MockDialogInformationComponent } from '../../../mocks/componentsMock';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let config = new DialogConfiguration();
  config.message = 'tes message';
  beforeEach(async () => {
    dialogServiceSpy = jasmine.createSpyObj<DialogService>('DialogService', ['watchConfiguration', 'watch']);
    dialogServiceSpy.watchConfiguration.and.returnValue(of(config));
    dialogServiceSpy.watch.and.returnValue(of(true));
    await TestBed.configureTestingModule({
      declarations: [DialogComponent, MockDialogInformationComponent, MockDialogActionsComponent],
      providers: [
        {
          provider: DialogService, useValue: dialogServiceSpy
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
