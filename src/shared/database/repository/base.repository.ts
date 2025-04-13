import {Injectable} from "@angular/core";
import {database} from "../database";
import {PromiseExtended} from "dexie";
import {BaseEntity} from "../entity/base.entity";

@Injectable({providedIn: 'root'})
export class BaseRepository {
  public findMainBase(): PromiseExtended<BaseEntity | undefined> {
    return database.base.filter((base) => base.id === 1).first();
  }
}
