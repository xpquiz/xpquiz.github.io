import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {QuestionWindowComponent} from "./question-window/question-window.component";
import {ResultWindowComponent} from './result-window/result-window.component';
import {CommonComponentsModule} from "../../common/common-components.module";
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    QuestionWindowComponent,
    ResultWindowComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    DirectivesModule,
    NgOptimizedImage
  ]
})
export class NormalModeModule {
}
