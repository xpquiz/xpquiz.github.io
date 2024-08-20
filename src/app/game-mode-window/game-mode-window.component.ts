import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {GameMode} from "../../model/enums/GameModesEnum";

@Component({
  selector: 'app-game-mode-window',
  templateUrl: './game-mode-window.component.html',
  styleUrls: ['./game-mode-window.component.sass']
})
export class GameModeWindowComponent {

  protected readonly PathsEnum = PathsEnum;

  protected readonly gameModes: GameMode[] = [
    GameMode.NORMAL,
    GameMode.TRIFECTA
  ];

  constructor(
    protected readonly router: Router
  ) {
  }

}
