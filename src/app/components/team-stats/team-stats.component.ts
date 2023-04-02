import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subscription, tap} from 'rxjs';
import {NbaService} from '../../services/nba.service';
import {Game, Stats, Team, TrackedTeam} from '../../data.models';
import { DropdownDaysOptions } from 'src/constants/team';
import { ObservableService } from 'src/app/services/observable.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {

  @Input() track!: TrackedTeam;
  @Output() deleteSelectedTeam = new EventEmitter<Team>();
  @Output() selectedDay = new EventEmitter<number>();
  dropdownOptions = DropdownDaysOptions;
  selectedDropdownOption = DropdownDaysOptions[1];
  subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
  }
  castString(value: string): number {
    return Number(value);
  }

}
