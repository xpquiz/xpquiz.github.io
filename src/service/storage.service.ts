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
    const stringfiedObject: string = JSON.stringify(value, this.replacer);
    const encryptedObject: string = this.encrypt(stringfiedObject);

    this.localStorage.setItem(this.storageKey, encryptedObject);
  }

  public get(): AppStorage | null {
    const encryptedItem: string | null = this.localStorage.getItem(this.storageKey);

    if (encryptedItem === null || encryptedItem === '')
      return null;
    else
      return JSON.parse(this.decrypt(encryptedItem), this.reviver);
  }

  private encrypt(value: string): string {
    const encrypted = AES.encrypt(value, this.encryptionkey);
    return encrypted.toString();
  }

  private decrypt(value: string): string {
    const decrypted = AES.decrypt(value, this.encryptionkey);
    return decrypted.toString(enc.Utf8);
  }

  private replacer(key: any, value: any) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }

  private reviver(key: any, value: any) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

}
