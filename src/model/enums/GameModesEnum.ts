export class GameMode {
  static readonly NORMAL = new GameMode('normal', 'Standard mode. Answer a question, wait 3 hours to play again. Simple as that.', 1);
  static readonly TRIFECTA = new GameMode('trifecta', 'Three questions for three times the score! At the risk of waiting 24 hours to play again.', 3);

  private constructor(public readonly title: string,
                      public readonly description: string,
                      public readonly questions: number) {
  }

  public static getByTitle(title: string): GameMode {
    switch(title) {
      case 'normal':
        return GameMode.NORMAL;
      case 'trifecta':
        return GameMode.TRIFECTA;
      default:
        return GameMode.NORMAL;
    }
  }
}

