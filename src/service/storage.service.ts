import {Injectable} from '@angular/core';
import {StorageKeyEnum} from "../model/StorageKeyEnum";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly localStorage: Storage;
  private readonly KEY: string = 'ENCRYPTION_KEY';

  constructor() {
    this.localStorage = window.localStorage;
  }

  public save(key: StorageKeyEnum, value: string): void {
    this.localStorage.setItem(key, this.encrypt(value));
  }

  public get(key: StorageKeyEnum): string | null {
    const encryptedItem: string | null = this.localStorage.getItem(key);

    return encryptedItem === null ? '' : this.decrypt(encryptedItem);
  }

  public clear(key: StorageKeyEnum) {
    this.localStorage.removeItem(key);
  }

  private encrypt(value: string): string {
    const encrypted = CryptoJS.AES.encrypt(value, this.KEY);
    return encrypted.toString();
  }

  private decrypt(value: string): string {
    const decrypted = CryptoJS.AES.decrypt(value, this.KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
