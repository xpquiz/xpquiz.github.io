import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionWindowComponent} from "./question-window/question-window.component";
import {MainWindowComponent} from "./main-window/main-window.component";
import {ScoreWindowComponent} from "./score-window/score-window.component";
import {PathsEnum} from "../model/enums/PathsEnum";
import {CorrectAnswerWindowComponent} from "./correct-answer-window/correct-answer-window.component";
import {WrongAnswerWindowComponent} from "./wrong-answer-window/wrong-answer-window.component";
import {AboutWindowComponent} from "./about-window/about-window.component";
import {GameModeWindowComponent} from "./game-mode-window/game-mode-window.component";
import {QuestionTrifectaWindowComponent} from "./question-trifecta-window/question-trifecta-window.component";

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
      path: PathsEnum.GAME_MODE,
      component: GameModeWindowComponent,
    },
    {
      path: `${PathsEnum.QUIZ_NORMAL}`,
      component: QuestionWindowComponent,
    },
    {
      path: `${PathsEnum.QUIZ_TRIFECTA}`,
      component: QuestionTrifectaWindowComponent,
    },
    {
      path: `${PathsEnum.CORRECT_ANSWER}/:mode/:result`,
      component: CorrectAnswerWindowComponent,
    },
    {
      path: `${PathsEnum.WRONG_ANSWER}/:mode/:result`,
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
