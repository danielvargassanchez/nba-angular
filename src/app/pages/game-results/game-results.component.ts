import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbaService } from '../../services/nba.service';
import { Game, Team, TrackedTeam } from '../../models/data.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {

  track?: TrackedTeam;
  games$?: Observable<Game[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private nbaService: NbaService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const tracked = this.nbaService.getTrackedTeams().find(item => item.team.abbreviation === paramMap.get("teamAbbr"));
      if (tracked) {
        this.track = tracked;
        this.games$ = this.nbaService.getLastResults(this.track.team, tracked.selectedDays);
      }
    })
  }

}
