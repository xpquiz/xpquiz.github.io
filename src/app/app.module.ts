import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {MainWindowComponent} from './main-window/main-window.component';
import {WindowTitleBarComponent} from './common/window-title-bar/window-title-bar.component';
import {ScoreWindowComponent} from './score-window/score-window.component';
import {AboutWindowComponent} from './about-window/about-window.component';
import {GameModeWindowComponent} from './game-mode-window/game-mode-window.component';
import {QuestionTrifectaWindowComponent} from './trifecta-mode/question-trifecta-window/question-trifecta-window.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TimeRushInfoWindowComponent} from './time-rush-mode/info-window/time-rush-info-window.component';
import {TimeRushModeModule} from "./time-rush-mode/time-rush-mode.module";
import {CommonComponentsModule} from "./common/common-components.module";
import {DirectivesModule} from "./directives/directives.module";
import {NormalModeModule} from "./normal-mode/normal-mode.module";

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    ScoreWindowComponent,
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
    TimeRushModeModule,
    NormalModeModule,
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
