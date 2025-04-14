import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {addHours, isBefore} from "date-fns";
import {TemplateService} from "@Shared/service/template.service";
import {EncryptionService} from "@Shared/service/encryption.service";
import {BaseRepository} from "@Shared/database/repository/base.repository";
import {HistoryRepository} from "@Shared/database/repository/history.repository";
import {PathsEnum} from '@Shared/model/enums/PathsEnum';
import {BaseEntity} from "@Shared/database/entity/base.entity";
import {HistoryEntity} from "@Shared/database/entity/history.entity";
import {QuestionResultTemplateParams, TemplateEnum} from "@Shared/model/Template";

@Component({
  selector: 'app-result-window',
  templateUrl: './result-window.component.html',
  styleUrls: ['./result-window.component.sass']
})
export class ResultWindowComponent {

  public correctAnswer: boolean = false;
  public questionScore: number = 0;
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;
  public hoursToPlayAgain: number = 3;
  protected readonly PathsEnum = PathsEnum;
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
    const questionResult: QuestionResultTemplateParams = JSON.parse(decryptedQuestionResult);
    const questionResultText: string = await this.templateService.render(TemplateEnum.QUESTION_RESULT, questionResult);

    this.correctAnswer = questionResult.questionPoints !== null;
    this.questionScore = questionResult.questionPoints!;
    this.clipboardText = questionResultText;
  }
}
