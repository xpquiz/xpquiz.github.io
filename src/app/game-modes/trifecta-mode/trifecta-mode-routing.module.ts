import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {QuestionWindowComponent} from "../normal-mode/question-window/question-window.component";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {ResultWindowComponent} from "../normal-mode/result-window/result-window.component";
import {QuestionTrifectaWindowComponent} from "./question-trifecta-window/question-trifecta-window.component";
import {QuestionTrifectaResultComponent} from "./question-trifecta-result/question-trifecta-result.component";

const routes: Routes = [
  {
    path: 'trifecta-mode',
    children: [
      {
        path: '',
        component: QuestionTrifectaWindowComponent,
      },
      {
        path: `${PathsEnum.QUIZ_TRIFECTA_RESULT}/:result`,
        component: QuestionTrifectaResultComponent,
      }
    ],
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TrifectaModeRoutingModule { }
