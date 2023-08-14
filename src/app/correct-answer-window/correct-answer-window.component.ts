import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorageService} from "../../service/app-storage.service";

@Component({
  selector: 'app-correct-answer-window',
  templateUrl: './correct-answer-window.component.html',
  styleUrls: ['./correct-answer-window.component.sass']
})
export class CorrectAnswerWindowComponent implements OnInit {

  public questionScore: number = 0;

  private correctAnswerSound: HTMLAudioElement = new Audio('assets/sounds/tada.wav');

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly appStorageService: AppStorageService
  ) {
    this.questionScore = parseInt(this.route.snapshot.paramMap.get('points') ?? '0');
  }

  public async ngOnInit(): Promise<void> {
    if (!this.appStorageService.canQuizBeAnswered()) {
      await this.returnHome();
      return;
    }

    await this.correctAnswerSound.play();
    this.saveCurrentScore();
  }

  public async returnHome(): Promise<void> {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

  private saveCurrentScore(): void {
    this.appStorageService.saveAnswer(true, this.questionScore);
  }
}
