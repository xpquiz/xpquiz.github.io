import {Injectable} from "@angular/core";
import {database} from "../database";
import {liveQuery, Observable} from "dexie";
import {BaseEntity} from "../entity/base.entity";

@Injectable({providedIn: 'root'})
export class BaseRepository {

  public findMainBase(): Observable<BaseEntity | undefined> {
    return liveQuery(() => database.base
      .filter((base) => base.id === 1)
      .first());
  }

}
