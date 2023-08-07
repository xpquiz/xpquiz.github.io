import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/PathsEnum";
import {StorageService} from "../../service/storage.service";
import {AppStorage} from "../../model/AppStorage";

@Component({
  selector: 'app-correct-answer-window',
  templateUrl: './correct-answer-window.component.html',
  styleUrls: ['./correct-answer-window.component.sass']
})
export class CorrectAnswerWindowComponent implements OnInit {

  public questionScore: number = 10;

  private correctAnswerSound: HTMLAudioElement = new Audio('assets/sounds/tada.wav');

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
    const appStorage: AppStorage = this.storageService.get();

    this.storageService.save(
      {
        ...appStorage,
        currentScore: appStorage.currentScore + this.questionScore,
        lastQuizResponseDate: new Date()
      }
    )
  }
}
