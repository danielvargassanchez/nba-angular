import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameStatsRoutingModule } from './game-stats-routing.module';
import { GameStatsComponent } from './game-stats.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [GameStatsComponent],
  imports: [
    CommonModule,
    GameStatsRoutingModule,
    ComponentsModule
  ]
})
export class GameStatsModule { }
