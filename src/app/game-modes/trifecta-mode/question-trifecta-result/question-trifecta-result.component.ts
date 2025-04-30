import {Component} from '@angular/core';
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {ActivatedRoute, Router} from "@angular/router";
import {addHours, isBefore} from "date-fns";
import {EncryptionService} from "@Shared/service/encryption.service";
import {TemplateService} from "@Shared/service/template.service";
import {BaseRepository} from "@Shared/database/repository/base.repository";
import {HistoryRepository} from "@Shared/database/repository/history.repository";
import {BaseEntity} from "@Shared/database/entity/base.entity";
import {HistoryEntity} from "@Shared/database/entity/history.entity";
import {QuestionResultTrifectaTemplateParams, TemplateEnum} from "@Shared/model/Template";

@Component({
  selector: 'app-question-trifecta-result',
  templateUrl: './question-trifecta-result.component.html',
  styleUrls: ['./question-trifecta-result.component.sass']
})
export class QuestionTrifectaResultComponent {
  public allAnswersCorrect: boolean = false;
  public questionScore: number = 0;
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;
  public hoursToPlayAgain: number = 3;
  public missedAnswers: string[][] = [['', '']];

  protected readonly PathsEnum = PathsEnum;

  private readonly correctAnswerSound: HTMLAudioElement = new Audio('assets/sounds/tada.wav');
  private readonly wrongAnswerSound: HTMLAudioElement = new Audio('assets/sounds/critical_stop.wav');
  private correctAnswers: number = 0;
  private wrongAnswers: number = 0;

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
    this.allAnswersCorrect ? await this.correctAnswerSound.play() : await this.wrongAnswerSound.play();
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
      gameMode: 'trifecta',
      won: this.allAnswersCorrect,
      correctAnswers: this.correctAnswers,
      wrongAnswers: this.wrongAnswers,
      totalPoints: this.questionScore,
    };
    const base: BaseEntity | undefined = await this.baseRepository.findMainBase();

    base!.nextQuizResponseDate = addHours(currentDate, this.hoursToPlayAgain);

    await this.historyRepository.save(newQuestionHistory);
    await this.baseRepository.updateBase(base);
  }

  private async retrieveRouteParams(): Promise<void> {
    const encryptedQuestionResult: string = this.route.snapshot.paramMap.get('result')!;

    const decryptedQuestionResult: string = this.encryptionService.decrypt(encryptedQuestionResult);
    const questionResult: QuestionResultTrifectaTemplateParams = JSON.parse(decryptedQuestionResult);
    const questionResultText: string = await this.templateService.render(TemplateEnum.QUESTION_RESULT_TRIFECTA, questionResult);

    this.correctAnswers = questionResult.selectedAnswers
      .filter(question => question.correct).length;
    this.wrongAnswers = questionResult.selectedAnswers
      .filter(question => !question.correct).length;
    this.missedAnswers = questionResult.selectedAnswers
      .filter(question => !question.correct)
      .map((question, index) => index)
      .map((index) => [questionResult.questions[index], questionResult.correctAnswers[index]]);
    this.allAnswersCorrect = this.correctAnswers === 3 && this.wrongAnswers === 0;
    this.hoursToPlayAgain = this.allAnswersCorrect ? 3 : 24;
    this.questionScore = questionResult.questionPoints!;
    this.clipboardText = questionResultText;
  }
}
