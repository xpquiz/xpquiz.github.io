import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionWindowComponent} from "./question-window/question-window.component";
import {MainWindowComponent} from "./main-window/main-window.component";
import {ScoreWindowComponent} from "./score-window/score-window.component";
import {PathsEnum} from "../model/PathsEnum";
import {CorrectAnswerWindowComponent} from "./correct-answer-window/correct-answer-window.component";
import {WrongAnswerWindowComponent} from "./wrong-answer-window/wrong-answer-window.component";
import {AboutWindowComponent} from "./about-window/about-window.component";

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: PathsEnum.HOME
    },
    {
      path: PathsEnum.HOME,
      component: MainWindowComponent
    },
    {
      path: PathsEnum.ABOUT,
      component: AboutWindowComponent
    },
    {
      path: PathsEnum.SCORES,
      component: ScoreWindowComponent
    },
    {
      path: PathsEnum.QUIZ,
      component: QuestionWindowComponent,
    },
    {
      path: PathsEnum.CORRECT_ANSWER,
      component: CorrectAnswerWindowComponent,
    },
    {
      path: PathsEnum.WRONG_ANSWER,
      component: WrongAnswerWindowComponent
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
