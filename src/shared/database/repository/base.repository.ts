import {Injectable} from "@angular/core";
import {database} from "../database";
import {BaseEntity} from "../entity/base.entity";

@Injectable({providedIn: 'root'})
export class BaseRepository {

  public findMainBase(): Promise<BaseEntity | undefined> {
    return database.base
      .filter((base) => base.id === 1)
      .first();
  }

  public async updateBase(base: BaseEntity | undefined) {
    await database.base.put(base!);
  }
}
