import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionWindowComponent} from "./question-window/question-window.component";
import {CorrectAnswerWindowComponent} from "./correct-answer-window/correct-answer-window.component";
import {WrongAnswerWindowComponent} from "./wrong-answer-window/wrong-answer-window.component";
import {CommonComponentsModule} from "../common/common-components.module";
import {DirectivesModule} from "../directives/directives.module";
import { ResultWindowComponent } from './result-window/result-window.component';


@NgModule({
  declarations: [
    QuestionWindowComponent,
    CorrectAnswerWindowComponent,
    WrongAnswerWindowComponent,
    ResultWindowComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    DirectivesModule
  ]
})
export class NormalModeModule {
}
