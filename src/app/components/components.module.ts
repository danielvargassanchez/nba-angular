import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamStatsComponent } from './team-stats/team-stats.component';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { DialogInformationComponent } from './dialog-information/dialog-information.component';
import { DialogActionsComponent } from './dialog-actions/dialog-actions.component';
import { GameFiltersComponent } from './game-filters/game-filters.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TeamStatsComponent, DialogComponent, DialogInformationComponent, DialogActionsComponent, GameFiltersComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    DialogComponent,
    DialogInformationComponent,
    DialogActionsComponent,
    GameFiltersComponent,
    TeamStatsComponent]
})
export class ComponentsModule { }
