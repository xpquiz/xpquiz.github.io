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
import { AboutWindowComponent } from './about-window/about-window.component';
import {CopyClipboardDirective} from "./directives/CopyClipboardDirective";
import { GameModeWindowComponent } from './game-mode-window/game-mode-window.component';
import { IconTextButtonComponent } from './common/icon-text-button/icon-text-button.component';
import { QuestionTrifectaWindowComponent } from './question-trifecta-window/question-trifecta-window.component';
import {ReactiveFormsModule} from "@angular/forms";

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
    AboutWindowComponent,
    CopyClipboardDirective,
    GameModeWindowComponent,
    IconTextButtonComponent,
    QuestionTrifectaWindowComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgOptimizedImage,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
