import {NgModule} from '@angular/core';
import {QuestionWindowComponent} from "./question-window/question-window.component";
import {RouterModule, Routes} from "@angular/router";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {ResultWindowComponent} from "./result-window/result-window.component";

const routes: Routes = [
  {
    path: 'normal-mode',
    children: [
      {
        path: '',
        component: QuestionWindowComponent,
      },
      {
        path: `${PathsEnum.RESULT}/:result`,
        component: ResultWindowComponent,
      }
    ],
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NormalModeRoutingModule {
}
