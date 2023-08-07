import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/PathsEnum";
import {StorageService} from "../../service/storage.service";
import {AppStorage} from "../../model/AppStorage";
import * as moment from "moment";

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
    private readonly storageService: StorageService
  ) {
    this.correctAnswer = this.route.snapshot.paramMap.get('answer');
  }

  public async ngOnInit(): Promise<void> {
    await this.wrongAnswerSound.play();
    this.updateStorage();
  }

  public async returnHome(): Promise<void> {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

  private updateStorage() {
    const appStorage: AppStorage = this.storageService.get();

    this.storageService.save({
      ...appStorage,
      currentScore: appStorage.currentScore,
      lastQuizResponseDate: moment().toISOString()
    });
  }
}
