import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/PathsEnum";
import {StorageService} from "../../service/storage.service";
import {StorageKeyEnum} from "../../model/StorageKeyEnum";

@Component({
  selector: 'app-wrong-answer-window',
  templateUrl: './wrong-answer-window.component.html',
  styleUrls: ['./wrong-answer-window.component.sass']
})
export class WrongAnswerWindowComponent implements OnInit {

  public correctAnswer: string | null = '';
  private wrongAnswerSound: HTMLAudioElement = new Audio('assets/sounds/winxpsounds/Windows XP Critical Stop.wav');

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly storageService: StorageService
  ) {
    this.correctAnswer = this.route.snapshot.paramMap.get('answer');
  }

  public async ngOnInit(): Promise<void> {
    await this.wrongAnswerSound.play();
  }

  public async returnHome(): Promise<void> {
    this.storageService.save(StorageKeyEnum.LAST_QUIZ_RESPONSE_DATE, new Date().getTime().toString());
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

}
