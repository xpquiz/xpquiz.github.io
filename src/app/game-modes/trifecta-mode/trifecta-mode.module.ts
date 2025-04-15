import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {QuestionTrifectaResultComponent} from './question-trifecta-result/question-trifecta-result.component';
import {CommonComponentsModule} from "../../common/common-components.module";
import {DirectivesModule} from "../../directives/directives.module";
import {QuestionTrifectaWindowComponent} from "./question-trifecta-window/question-trifecta-window.component";

@NgModule({
  declarations: [
    QuestionTrifectaWindowComponent,
    QuestionTrifectaResultComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    DirectivesModule,
    NgOptimizedImage
  ]
})
export class TrifectaModeModule {
}
