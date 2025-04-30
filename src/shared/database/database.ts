import Dexie, {Table} from "dexie";
import {HistoryEntity} from "./entity/history.entity";
import {BaseEntity} from "./entity/base.entity";

class Database extends Dexie {
  public readonly history!: Table<HistoryEntity, number>;
  public readonly base!: Table<BaseEntity, number>;

  constructor() {
    super('xpquizDatabase');

    this.version(1).stores({
      history: '++id, date, gameMode, won',
      base: 'id'
    });

    this.on('populate', () => this.populate());
  }

  async populate() {
    await this.base.add({
      id: 1,
      nextQuizResponseDate: new Date(),
    });
  }
}

export const database = new Database();
