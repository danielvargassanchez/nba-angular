import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownDaysOptions } from '../../../constants/team';
import { Team, TrackedTeam } from '../../models/data.models';

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
