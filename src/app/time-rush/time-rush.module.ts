import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TimeRushQuestionWindowComponent} from './question-window/time-rush-question-window.component';
import {CommonComponentsModule} from "../common/common-components.module";
import { WrongQuestionTimeoutWindowComponent } from './wrong-question-timeout-window/wrong-question-timeout-window.component';
import { AllAnswersCorrectWindowComponent } from './all-answers-correct-window/all-answers-correct-window.component';

@NgModule({
  declarations: [
    TimeRushQuestionWindowComponent,
    WrongQuestionTimeoutWindowComponent,
    AllAnswersCorrectWindowComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    CommonComponentsModule
  ]
})
export class TimeRushModule {
}
