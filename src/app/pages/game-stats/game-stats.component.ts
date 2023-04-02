import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActionButton } from '../../models/dialog.model';
import { DialogService } from '../../services/dialog.service';
import { DefaultSizeDialog } from '../../../constants/dialog';
import { Stats, Team, TrackedTeam } from '../../models/data.models';
import { Division, FiltersInfo } from '../../models/division.model';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent {
  teams: Team[] = [];
  allTeams: Team[] = [];
  allInformation: FiltersInfo = new FiltersInfo();
  divisions: Division[] = [];
  conferences: string[] = [];
  selectedConference = "";
  selectedDivision = "";

  constructor(
    protected nbaService: NbaService,
    private dialogService: DialogService) {

    nbaService.getAllTeams().subscribe(data => {
      this.allTeams = data;
      this.teams = data;
      this.allInformation = nbaService.getConferencesAndDivisions(this.allTeams);
      this.divisions = this.allInformation.divisions;
      this.conferences = this.allInformation.conferences;
    });
  }

  reloadStats(): void {
    this.nbaService.getTrackedTeams().forEach((track) => {
      this.getTeamStats(track.team, track.selectedDays).subscribe((stats) => {
        track.stats = stats;
      });
    })
  }
  trackTeam(teamId: string): void {
    let team = this.allTeams.find(team => team.id == Number(teamId));
    if (team) {
      this.getTeamStats(team, 12).subscribe((stats) => {
        const trackedTeam: TrackedTeam = {
          selectedDays: 12,
          stats,
          team: team!
        };
        this.nbaService.addTrackedTeam(trackedTeam);
      });
    }
  }
  getTeamStats(team: Team, days: number): Observable<Stats> {
    return this.nbaService.getLastResults(team, days).pipe(map((games) => this.nbaService.getStatsFromGames(games, team!)));
  }

  trackByfn = (index: number, track: TrackedTeam): string => {
    return track.team.id.toString();
  }
  conferenceChange(conference: string): void {
    this.selectedConference = conference;
    this.divisions = this.allInformation.divisions.filter(item => item.conference.toUpperCase() === String(conference).toUpperCase());
    this.selectedDivision = this.divisions.map(item => item.divisionName).includes(this.selectedDivision) ?
      this.selectedDivision : "";
    this.filterTeams(this.selectedConference, this.selectedDivision);
  }
  divisionChange(division: string): void {
    this.selectedDivision = division;
    this.filterTeams(this.selectedConference, this.selectedDivision);
  }
  deleteTeam(team: Team): void {
    const closeAction: ActionButton = {
      message: 'No',
      styles: '',
      action: () => { this.dialogService.close() }
    }
    const acceptAction: ActionButton = {
      message: 'Yes',
      styles: 'primary',
      action: () => { this.nbaService.removeTrackedTeam(team); this.dialogService.close(); },
    }
    this.dialogService.open({
      width: DefaultSizeDialog.width,
      height: '120px',
      message: '<p class="text-center">Are you sure you want to remove this team?</p>',
      actions: [closeAction, acceptAction],
    });
    ;
  }
  private filterTeams(conference: string, division: string): void {
    this.teams = this.allTeams.filter(team => this.validateSelection(team, conference, "conference") &&
      this.validateSelection(team, division, "division")
    );
  }
  private validateSelection(team: Team, selection: string, key: keyof Team): boolean {
    return selection === "" || team[key].toString().toUpperCase() === selection.toUpperCase();
  }
}
