import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseRepository} from "../../../shared/database/repository/base.repository";
import {BaseEntity} from "../../../shared/database/entity/base.entity";
import {addHours, isBefore} from "date-fns";
import {EncryptionService} from "../../../shared/service/encryption.service";
import {TemplateService} from "../../../shared/service/template.service";
import {PathsEnum} from 'src/shared/model/enums/PathsEnum';
import {
  QuestionResultTemplateParams,
  QuestionResultTrifectaTemplateParams,
  TemplateEnum
} from "../../../shared/model/Template";
import {HistoryEntity} from "../../../shared/database/entity/history.entity";
import {HistoryRepository} from "../../../shared/database/repository/history.repository";

@Component({
  selector: 'app-result-window',
  templateUrl: './result-window.component.html',
  styleUrls: ['./result-window.component.sass']
})
export class ResultWindowComponent {

  protected readonly PathsEnum = PathsEnum;

  public correctAnswer: boolean = false;
  public questionScore: number = 0;
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;
  public hoursToPlayAgain: number = 3;

  private correctAnswerSound: HTMLAudioElement = new Audio('assets/sounds/tada.wav');

  constructor(
    protected readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly encryptionService: EncryptionService,
    private readonly templateService: TemplateService,
    private readonly baseRepository: BaseRepository,
    private readonly historyRepository: HistoryRepository,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    const baseEntity: BaseEntity | undefined = await this.baseRepository.findMainBase();

    if (isBefore(new Date(), baseEntity!.nextQuizResponseDate)) {
      await this.router.navigateByUrl(PathsEnum.HOME);
      return;
    }

    await this.retrieveRouteParams();
    await this.saveCurrentScore();
    await this.correctAnswerSound.play();
  }

  public async showClipboardMessage(): Promise<void> {
    this.displayClipboardMessage = true;

    await new Promise(f => setTimeout(f, 5000));

    this.displayClipboardMessage = false;
  }

  private async saveCurrentScore(): Promise<void> {
    const currentDate: Date = new Date();
    const newQuestionHistory: HistoryEntity = {
      date: currentDate,
      gameMode: 'normal',
      won: this.correctAnswer,
      correctAnswers: this.correctAnswer ? 1 : 0,
      wrongAnswers: this.correctAnswer ? 0 : 1,
      totalScore: this.questionScore,
    };
    const base: BaseEntity | undefined = await this.baseRepository.findMainBase();

    base!.nextQuizResponseDate = addHours(currentDate, this.hoursToPlayAgain);

    await this.historyRepository.save(newQuestionHistory);
    await this.baseRepository.updateBase(base);
  }

  private async retrieveRouteParams(): Promise<void> {
    const encryptedQuestionResult: string = this.route.snapshot.paramMap.get('result')!;

    const decryptedQuestionResult: string = this.encryptionService.decrypt(encryptedQuestionResult);
    const questionResult: QuestionResultTemplateParams | QuestionResultTrifectaTemplateParams = JSON.parse(decryptedQuestionResult);
    const questionResultText: string = await this.templateService.render(TemplateEnum.QUESTION_RESULT, questionResult);

    this.correctAnswer = questionResult.questionPoints !== null;
    this.questionScore = questionResult.questionPoints!;
    this.clipboardText = questionResultText;
  }
}
