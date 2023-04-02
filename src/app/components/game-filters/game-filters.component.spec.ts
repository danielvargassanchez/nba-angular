import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFiltersComponent } from './game-filters.component';

describe('GameFiltersComponent', () => {
  let component: GameFiltersComponent;
  let fixture: ComponentFixture<GameFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should changeConference', () => {
    const testText = 'test conference'
    spyOn(component.conferenceSelected, 'emit');
    component.changeConference({
      value: testText
    });
    expect(component.conferenceSelected.emit).toHaveBeenCalledWith(testText);
  });
  it('should changeDivision', () => {
    const testText = 'test division'
    spyOn(component.divisionSelected, 'emit');
    component.changeDivision({
      value: testText
    });
    expect(component.divisionSelected.emit).toHaveBeenCalledWith(testText);
  });

});
