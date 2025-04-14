import {TemplateEnum} from "../Template";

export class GameMode {
  static readonly NORMAL = new GameMode('normal', 'Standard mode. Answer a question, wait 3 hours to play again. Simple as that.', TemplateEnum.QUESTION_RESULT);
  static readonly TRIFECTA = new GameMode('trifecta', 'Three questions for three times the score! At the risk of waiting 24 hours to play again.', TemplateEnum.QUESTION_RESULT_TRIFECTA);
  static readonly TIME_RUSH = new GameMode('time-rush-mode', 'Five questions with 30 seconds each to be answered! All must be guessed in the right time!', TemplateEnum.QUESTION_RESULT);

  private constructor(public readonly title: string,
                      public readonly description: string,
                      public readonly templateEnum: TemplateEnum) {
  }

  public static getByTitle(title: string): GameMode {
    switch(title) {
      case 'normal':
        return GameMode.NORMAL;
      case 'trifecta':
        return GameMode.TRIFECTA;
      case 'time-rush-mode':
        return GameMode.TIME_RUSH;
      default:
        return GameMode.NORMAL;
    }
  }
}

