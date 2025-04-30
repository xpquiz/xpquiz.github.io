import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {MainWindowComponent} from './main-window/main-window.component';
import {WindowTitleBarComponent} from './common/window-title-bar/window-title-bar.component';
import {AboutWindowComponent} from './about-window/about-window.component';
import {GameModeWindowComponent} from './game-mode-window/game-mode-window.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonComponentsModule} from "./common/common-components.module";
import {DirectivesModule} from "./directives/directives.module";
import {TimeRushModeRoutingModule} from "./game-modes/time-rush-mode/time-rush-mode-routing.module";
import {NormalModeRoutingModule} from "./game-modes/normal-mode/normal-mode-routing.module";
import {TrifectaModeRoutingModule} from "./game-modes/trifecta-mode/trifecta-mode-routing.module";
import {ScoreModule} from "./score/score.module";

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    AboutWindowComponent,
    GameModeWindowComponent,
  ],
  imports: [
    NormalModeRoutingModule,
    TrifectaModeRoutingModule,
    TimeRushModeRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    ScoreModule,
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
