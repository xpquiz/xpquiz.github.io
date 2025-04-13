import {Injectable} from "@angular/core";
import {HistoryEntity} from "../entity/history.entity";
import {database} from "../database";
import {PromiseExtended} from "dexie";

@Injectable({  providedIn: 'root',})
export class HistoryRepository {

  public findAll(): PromiseExtended<HistoryEntity[]> {
    return database.history.toArray();
  }

}
