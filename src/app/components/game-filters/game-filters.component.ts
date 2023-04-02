import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../models/data.models';
import { Division } from '../../models/division.model';

@Component({
  selector: 'app-game-filters',
  templateUrl: './game-filters.component.html',
  styleUrls: ['./game-filters.component.css']
})
export class GameFiltersComponent {

  @Input() teams: Team[] = [];
  @Input() divisions: Division[] = [];
  @Input() conferences: string[] = [];
  @Input() selectedConference = "";
  @Input() selectedDivision = "";
  @Output() conferenceSelected = new EventEmitter<string>();
  @Output() divisionSelected = new EventEmitter<string>();
  @Output() trackTeam = new EventEmitter<string>();

  changeConference(target: any): void {
    this.conferenceSelected.emit(target.value);
  }
  changeDivision(target: any): void {
    this.divisionSelected.emit(target.value);
  }
}
