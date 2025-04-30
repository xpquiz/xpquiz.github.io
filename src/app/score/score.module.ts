import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {ScoreWindowComponent} from "./score-window/score-window.component";
import {CommonComponentsModule} from "../common/common-components.module";
import {DirectivesModule} from "../directives/directives.module";
import {AllTimeScoreComponent} from './all-time-score/all-time-score.component';
import {ModeScoreComponent} from './mode-score/mode-score.component';
import {ReactiveFormsModule} from "@angular/forms";
import { GameHistoryScoreComponent } from './game-history-score/game-history-score.component';

@NgModule({
  declarations: [
    ScoreWindowComponent,
    AllTimeScoreComponent,
    ModeScoreComponent,
    GameHistoryScoreComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    DirectivesModule,
    ReactiveFormsModule,
    AsyncPipe
  ], exports: [
    ScoreWindowComponent
  ]
})
export class ScoreModule {
}
