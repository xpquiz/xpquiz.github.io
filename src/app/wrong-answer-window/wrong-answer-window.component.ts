import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorageService} from "../../service/app-storage.service";

@Component({
  selector: 'app-wrong-answer-window',
  templateUrl: './wrong-answer-window.component.html',
  styleUrls: ['./wrong-answer-window.component.sass']
})
export class WrongAnswerWindowComponent implements OnInit {

  public correctAnswer: string | null = '';
  private wrongAnswerSound: HTMLAudioElement = new Audio('assets/sounds/critical_stop.wav');

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly appStorageService: AppStorageService
  ) {
    this.correctAnswer = this.route.snapshot.paramMap.get('answer');
  }

  public async ngOnInit(): Promise<void> {
    if (!this.appStorageService.canQuizBeAnswered()) {
      await this.returnHome();
      return;
    }

    await this.wrongAnswerSound.play();
    this.saveCurrentScore();
  }

  public async returnHome(): Promise<void> {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

  private saveCurrentScore() {
    this.appStorageService.saveAnswer(false);
  }
}
