import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { format, subDays } from 'date-fns';
import { Game, Stats, Team, TrackedTeam } from '../models/data.models';
import { environment } from '../../environments/environment';
import { ConsumeService } from './consume.service';
import { Division } from '../models/division.model';

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  trackedTeams: TrackedTeam[] = [];
  constructor(private consumeService: ConsumeService) { }

  addTrackedTeam(team: TrackedTeam): void {
    this.trackedTeams.push(team);
  }

  removeTrackedTeam(team: Team): void {
    let index = this.trackedTeams.findIndex(t => t.team.id == team.id);
    this.trackedTeams.splice(index, 1);
  }

  getTrackedTeams(): TrackedTeam[] {
    return this.trackedTeams;
  }

  getAllTeams(): Observable<Team[]> {
    return this.consumeService.httpGet<{ data: Team[] }>(`${environment.rapid.apiURL}/teams?page=0`).
      pipe(map(res => res.data));
  }
  getConferencesAndDivisions(teams: Team[]): { conferences: string[], divisions: Division[] } {
    const conferences: string[] = [];
    const divisions: Division[] = [];
    teams.forEach((team) => {
      if (!conferences.includes(team.conference)) {
        conferences.push(team.conference)
      }
      const divisionsName = divisions.map(item => item.divisionName);
      if (!divisionsName.includes(team.division)) {
        divisions.push({
          divisionName: team.division,
          conference: team.conference
        });
      }
    })
    return {
      conferences: conferences,
      divisions: divisions
    }
  }
  getLastResults(team: Team, numberOfDays = 12): Observable<Game[]> {
    return this.consumeService.httpGet<{ meta: any, data: Game[] }>(`${environment.rapid.apiURL}/games?page=0${this.getDaysQueryString(numberOfDays)}`,
      { per_page: 12, "team_ids[]": "" + team.id }).pipe(map(res => res.data));
  }

  getStatsFromGames(games: Game[], team: Team): Stats {
    const stats: Stats = { wins: 0, losses: 0, averagePointsScored: 0, averagePointsConceded: 0, lastGames: [] };
    games.forEach(game => {
      const gameStats = this.getSingleGameStats(team, game);
      stats.wins += gameStats.wins;
      stats.losses += gameStats.losses;
      stats.averagePointsConceded += gameStats.averagePointsConceded;
      stats.averagePointsScored += gameStats.averagePointsScored;
      stats.lastGames.push(gameStats.wins == 1 ? 'W' : 'L');
    });
    stats.averagePointsScored = Math.round(stats.averagePointsScored / games.length);
    stats.averagePointsConceded = Math.round(stats.averagePointsConceded / games.length);
    return stats;
  }

  private getDaysQueryString(nbOfDays = 12): string {
    let qs = "";
    for (let i = 1; i < nbOfDays; i++) {
      let date = format(subDays(new Date(), i), "yyyy-MM-dd")
      qs = qs.concat("&dates[]=" + date);
    }
    return qs;
  }


  private getSingleGameStats(team: Team, game: Game): Stats {
    const stats: Stats = { wins: 0, losses: 0, averagePointsScored: 0, averagePointsConceded: 0, lastGames: [] };
    if (game.home_team.id === team.id) {
      stats.averagePointsScored = game.home_team_score;
      stats.averagePointsConceded = game.visitor_team_score;
      if (game.home_team_score > game.visitor_team_score) {
        stats.wins += 1;
      } else {
        stats.losses += 1;
      }
    }
    if (game.visitor_team.id === team.id) {
      stats.averagePointsScored = game.visitor_team_score;
      stats.averagePointsConceded = game.home_team_score;
      if (game.visitor_team_score > game.home_team_score) {
        stats.wins = 1;
      } else {
        stats.losses = 1;
      }
    }
    return stats;
  }
}
