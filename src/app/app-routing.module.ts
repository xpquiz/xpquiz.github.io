import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainWindowComponent} from "./main-window/main-window.component";
import {ScoreWindowComponent} from "./score/score-window/score-window.component";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {AboutWindowComponent} from "./about-window/about-window.component";
import {GameModeWindowComponent} from "./game-mode-window/game-mode-window.component";

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: PathsEnum.HOME
    },
    {
      path: PathsEnum.HOME,
      component: MainWindowComponent
    },
    {
      path: PathsEnum.ABOUT,
      component: AboutWindowComponent
    },
    {
      path: PathsEnum.SCORES,
      component: ScoreWindowComponent
    },
    {
      path: PathsEnum.GAME_MODE,
      component: GameModeWindowComponent,
    },
    {
      path: 'normal-mode',
      loadChildren: () => import('./game-modes/normal-mode/normal-mode.module').then(m => m.NormalModeModule)
    },
    {
      path: 'time-rush-mode',
      loadChildren: () => import('./game-modes/time-rush-mode/time-rush-mode.module').then(m => m.TimeRushModeModule)
    },
    {
      path: 'trifecta-mode',
      loadChildren: () => import('./game-modes/trifecta-mode/trifecta-mode.module').then(m => m.TrifectaModeModule)
    },
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
