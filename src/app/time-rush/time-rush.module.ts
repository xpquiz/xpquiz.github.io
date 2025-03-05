import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TimeRushQuestionWindowComponent} from './question-window/time-rush-question-window.component';
import {CommonComponentsModule} from "../common/common-components.module";

@NgModule({
  declarations: [
    TimeRushQuestionWindowComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    CommonComponentsModule
  ]
})
export class TimeRushModule {
}
