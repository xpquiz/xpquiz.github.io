import {Component, OnInit} from '@angular/core';
import {PathsEnum} from "../../../model/enums/PathsEnum";
import {AppStorageService} from "../../../service/app-storage.service";
import {Router} from "@angular/router";
import {Question} from "../../../model/questions/Question";
import {TriviaService} from "../../../service/trivia.service";

@Component({
  selector: 'app-info-window',
  templateUrl: './time-rush-info-window.component.html',
  styleUrls: ['./time-rush-info-window.component.sass']
})
export class TimeRushInfoWindowComponent implements OnInit {

  protected readonly PathsEnum = PathsEnum;

  constructor(
    private readonly appStorageService: AppStorageService,
    protected readonly router: Router
  ) {
  }

  public async ngOnInit(): Promise<void> {
    if (!this.appStorageService.canQuizBeAnswered())
      await this.router.navigateByUrl(PathsEnum.HOME);
  }

}
