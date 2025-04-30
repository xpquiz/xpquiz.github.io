import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TimeRushInfoWindowComponent} from "./info-window/time-rush-info-window.component";
import {TimeRushQuestionWindowComponent} from "./question-window/time-rush-question-window.component";
import {
  WrongQuestionTimeoutWindowComponent
} from "./wrong-question-timeout-window/wrong-question-timeout-window.component";
import {AllAnswersCorrectWindowComponent} from "./all-answers-correct-window/all-answers-correct-window.component";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";

const routes: Routes = [
  {
    path: 'time-rush-mode',
    children: [

      {
        path: '',
        component: TimeRushInfoWindowComponent
      },
      {
        path: PathsEnum.QUIZ_TIME_RUSH_QUESTION,
        component: TimeRushQuestionWindowComponent
      },
      {
        path: `${PathsEnum.QUIZ_TIME_RUSH_WRONG_ANSWER_OR_TIMEOUT}/:totalPoints/:type/:questions`,
        component: WrongQuestionTimeoutWindowComponent
      },
      {
        path: `${PathsEnum.QUIZ_TIME_RUSH_ALL_ANSWERS_CORRECT}/:totalPoints`,
        component: AllAnswersCorrectWindowComponent
      }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TimeRushModeRoutingModule {
}
