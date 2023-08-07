import {Injectable} from '@angular/core';
import {AES, enc} from 'crypto-js';
import {AppStorage} from "../model/AppStorage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly localStorage: Storage;
  private readonly storageKey: string = 'app_storage'
  private readonly encryptionkey: string = 'ENCRYPTION_KEY_XPQUIZ';

  constructor() {
    this.localStorage = window.localStorage;
  }

  public save(value: AppStorage): void {
    const stringfiedObject: string = JSON.stringify(value);
    const encryptedObject: string = this.encrypt(stringfiedObject);

    this.localStorage.setItem(this.storageKey, encryptedObject);
  }

  public get(): AppStorage {
    const encryptedItem: string | null = this.localStorage.getItem(this.storageKey);
    return (encryptedItem === null || encryptedItem === '') ?
      {
        currentScore: 0,
        lastQuizResponseDate: null
      } :
      JSON.parse(this.decrypt(encryptedItem));
  }

  private encrypt(value: string): string {
    const encrypted = AES.encrypt(value, this.encryptionkey);
    return encrypted.toString();
  }

  private decrypt(value: string): string {
    const decrypted = AES.decrypt(value, this.encryptionkey);
    return decrypted.toString(enc.Utf8);
  }
}
