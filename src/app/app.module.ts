import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionWindowComponent} from './question-window/question-window.component';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {MainWindowComponent} from './main-window/main-window.component';
import {IconButtonComponent} from './common/icon-button/icon-button.component';
import {WindowTitleBarComponent} from './common/window-title-bar/window-title-bar.component';
import {ScoreWindowComponent} from './score-window/score-window.component';
import { CorrectAnswerWindowComponent } from './correct-answer-window/correct-answer-window.component';
import { WrongAnswerWindowComponent } from './wrong-answer-window/wrong-answer-window.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionWindowComponent,
    MainWindowComponent,
    IconButtonComponent,
    WindowTitleBarComponent,
    ScoreWindowComponent,
    CorrectAnswerWindowComponent,
    WrongAnswerWindowComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
