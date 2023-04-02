import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Team, TrackedTeam } from "../app/models/data.models";
import { Division } from "../app/models/division.model";

@Component({ selector: 'app-dialog-information', template: '' })
export class MockDialogInformationComponent {
}
@Component({ selector: 'app-dialog-actions', template: '' })
export class MockDialogActionsComponent {
}
@Component({ selector: 'app-dialog', template: '' })
export class MockDialogComponent {
}
@Component({ selector: 'app-game-filters', template: '' })
export class MockGameFiltersComponent {
    @Input() teams: Team[] = [];
    @Input() divisions: Division[] = [];
    @Input() conferences: string[] = [];
    @Input() selectedConference = "";
    @Input() selectedDivision = "";
    @Output() conferenceSelected = new EventEmitter<string>();
    @Output() divisionSelected = new EventEmitter<string>();
    @Output() trackTeam = new EventEmitter<string>();
}
@Component({ selector: 'app-team-stats', template: '' })
export class MockTeamStatsComponent {
    @Input() track!: TrackedTeam;
    @Output() deleteSelectedTeam = new EventEmitter<Team>();
    @Output() selectedDay = new EventEmitter<number>();
}




