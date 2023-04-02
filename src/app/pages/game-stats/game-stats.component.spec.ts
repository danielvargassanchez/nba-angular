import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatsComponent } from './game-stats.component';
import { MockGameFiltersComponent, MockTeamStatsComponent } from '../../../mocks/componentsMock';
import { NbaService } from '../../services/nba.service';
import { of } from 'rxjs';
import { DialogService } from '../../services/dialog.service';
import { TrackedTeam } from '../../models/data.models';

describe('GameStatsComponent', () => {
  let component: GameStatsComponent;
  let fixture: ComponentFixture<GameStatsComponent>;
  let nbaServiceSpy: jasmine.SpyObj<NbaService>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  
  beforeEach(async () => {
    nbaServiceSpy = jasmine.createSpyObj<NbaService>('NbaService', ['getAllTeams',
      'removeTrackedTeam',
      'getConferencesAndDivisions',
      'addTrackedTeam',
      'getLastResults',
      'getStatsFromGames',
      'getTrackedTeams']);
    nbaServiceSpy.getAllTeams.and.returnValue(of([
      {
        id: 1,
        abbreviation: '',
        city: '',
        conference: 'conference 1',
        division: 'division 1',
        full_name: '',
        name: ''
      },
      {
        id: 2,
        abbreviation: '',
        city: '',
        conference: 'conference 2',
        division: 'division 2',
        full_name: '',
        name: ''
      }
    ]));
    nbaServiceSpy.getConferencesAndDivisions.and.returnValue({
      conferences: [
        'conference 1',
        'conference 2',
        'conference 3',
      ],
      divisions: [
        {
          conference: 'conference 1',
          divisionName: 'division 1'
        },
        {
          conference: 'conference 2',
          divisionName: 'division 2'
        }
      ]
    });
    nbaServiceSpy.getTrackedTeams.and.returnValue([]);
    nbaServiceSpy.getLastResults.and.returnValue(of([]));
    nbaServiceSpy.getStatsFromGames.and.returnValue({
      wins: 1,
      losses: 1,
      averagePointsScored: 1,
      averagePointsConceded: 1,
      lastGames: []
    });
    dialogServiceSpy = jasmine.createSpyObj<DialogService>('DialogService',['open','close']);
    await TestBed.configureTestingModule({
      declarations: [GameStatsComponent, MockGameFiltersComponent, MockTeamStatsComponent],
      providers: [
        { provide: NbaService, useValue: nbaServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should trackTeam', ()=> {
    component.trackTeam('2');
    const team = {
      id: 2,
      abbreviation: '',
      city: '',
      conference: 'conference 2',
      division: 'division 2',
      full_name: '',
      name: ''
    };
    const stats = {
      wins: 1,
      losses: 1,
      averagePointsScored: 1,
      averagePointsConceded: 1,
      lastGames: []
    }
    expect(nbaServiceSpy.addTrackedTeam).toHaveBeenCalledWith({
      stats,
      team,
      selectedDays: 12
    });
  });
  it('should trackByfn', ()=> {
    const tracked: TrackedTeam = {
      team: {
        id: 1,
        abbreviation: '',
        city: '',
        conference: '',
        division: '',
        full_name: '',
        name: ''
      },
      stats: {  
        wins: 1,
        losses: 1,
        averagePointsScored: 1,
        averagePointsConceded: 1,
        lastGames: []
      },
      selectedDays: 12
    }
    expect(component.trackByfn(1, tracked)).toEqual('1');
  });
  it('should conferenceChange', ()=> {
    component.selectedDivision = "division 1"
    component.conferenceChange('conference 1');
    expect(component.teams.length).toBe(1);
  });
  it('should conferenceChange', ()=> {
    component.selectedConference = "conference 1"
    component.divisionChange('division 1');
    expect(component.teams.length).toBe(1);
  });
  it('should deleteTeam', ()=> {
    const team = {
      id: 2,
      abbreviation: '',
      city: '',
      conference: 'conference 2',
      division: 'division 2',
      full_name: '',
      name: ''
    };
    component.deleteTeam(team);
    expect(dialogServiceSpy.open).toHaveBeenCalled();
  });
});
