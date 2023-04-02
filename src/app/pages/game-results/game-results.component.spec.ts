import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultsComponent } from './game-results.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { NbaService } from '../../services/nba.service';
import { Team, TrackedTeam } from '../../models/data.models';

describe('GameResultsComponent', () => {
  let component: GameResultsComponent;
  let fixture: ComponentFixture<GameResultsComponent>;
  let nbaServiceSpy: jasmine.SpyObj<NbaService>;
  let team: Team = {
    id: 1,
    abbreviation: "test",
    city: "",
    conference: "",
    division: "",
    full_name: "",
    name: "",
  }
  let teamList: TrackedTeam[] = [
    {
      team,
      stats: {
        wins: 1,
        losses: 1,
        averagePointsScored: 1,
        averagePointsConceded: 1,
        lastGames: [],
      },
      selectedDays: 12,
    }
  ]
  beforeEach(async () => {
    nbaServiceSpy = jasmine.createSpyObj<NbaService>('NbaService', ['getTrackedTeams', 'getLastResults']);
    nbaServiceSpy.getTrackedTeams.and.returnValue(teamList);
    nbaServiceSpy.getLastResults.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [GameResultsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                teamAbbr: "test",
              })
            ),
          },
        },
        { provide: NbaService, useValue: nbaServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.track?.team.id).toEqual(team.id)
  });
});


