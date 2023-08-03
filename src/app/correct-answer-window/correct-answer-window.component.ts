import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/PathsEnum";
import {StorageService} from "../../service/storage.service";
import {StorageKeyEnum} from "../../model/StorageKeyEnum";

@Component({
  selector: 'app-correct-answer-window',
  templateUrl: './correct-answer-window.component.html',
  styleUrls: ['./correct-answer-window.component.sass']
})
export class CorrectAnswerWindowComponent implements OnInit {

  public questionScore: number = 10;

  private correctAnswerSound: HTMLAudioElement = new Audio('assets/sounds/winxpsounds/tada.wav');

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    await this.correctAnswerSound.play();
    this.saveCurrentScore();
  }

  public async returnHome(): Promise<void> {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

  private saveCurrentScore(): void {
    const currentScore: string | null = this.storageService.get(StorageKeyEnum.CURRENT_SCORE);
    let currentScoreNumber: number = currentScore === null ? 0 : parseInt(currentScore);

    currentScoreNumber += this.questionScore;

    this.storageService.save(StorageKeyEnum.CURRENT_SCORE, currentScoreNumber.toString());
    this.storageService.save(StorageKeyEnum.LAST_QUIZ_RESPONSE_DATE, new Date().getTime().toString());
  }
}
