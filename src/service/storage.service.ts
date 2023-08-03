import {Injectable} from '@angular/core';
import {StorageKeyEnum} from "../model/StorageKeyEnum";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  public save(key: StorageKeyEnum, value: string): void {
    this.localStorage.setItem(key, value);
  }

  public get(key: StorageKeyEnum): string | null {
    return this.localStorage.getItem(key);
  }
}
