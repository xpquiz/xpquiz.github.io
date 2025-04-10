import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionWindowComponent} from './question-window/question-window.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MainWindowComponent} from './main-window/main-window.component';
import {WindowTitleBarComponent} from './common/window-title-bar/window-title-bar.component';
import {ScoreWindowComponent} from './score-window/score-window.component';
import {CorrectAnswerWindowComponent} from './correct-answer-window/correct-answer-window.component';
import {WrongAnswerWindowComponent} from './wrong-answer-window/wrong-answer-window.component';
import {AboutWindowComponent} from './about-window/about-window.component';
import {CopyClipboardDirective} from "./directives/copy-clipboard.directive";
import {GameModeWindowComponent} from './game-mode-window/game-mode-window.component';
import {QuestionTrifectaWindowComponent} from './question-trifecta-window/question-trifecta-window.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TimeRushInfoWindowComponent} from './time-rush/info-window/time-rush-info-window.component';
import {TimeRushModule} from "./time-rush/time-rush.module";
import {CommonComponentsModule} from "./common/common-components.module";
import {DirectivesModule} from "./directives/directives.module";

@NgModule({
  declarations: [
    AppComponent,
    QuestionWindowComponent,
    MainWindowComponent,
    ScoreWindowComponent,
    CorrectAnswerWindowComponent,
    WrongAnswerWindowComponent,
    AboutWindowComponent,
    GameModeWindowComponent,
    QuestionTrifectaWindowComponent,
    TimeRushInfoWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    TimeRushModule,
    CommonComponentsModule,
    DirectivesModule
  ],
  providers: [],
  exports: [
    WindowTitleBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
