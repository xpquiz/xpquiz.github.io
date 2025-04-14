import {NgModule} from '@angular/core';
import {QuestionWindowComponent} from "./question-window/question-window.component";
import {RouterModule, Routes} from "@angular/router";
import {PathsEnum} from "../../shared/model/enums/PathsEnum";

const routes: Routes = [
  {
    path: PathsEnum.QUIZ,
    component: QuestionWindowComponent,
  },
  {
    path: `${PathsEnum.RESULT}/:result`,
    component: QuestionWindowComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NormalModeRoutingModule {
}
