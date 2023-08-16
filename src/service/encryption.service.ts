import { Injectable } from '@angular/core';
import {AppStorage} from "../model/AppStorage";
import {AES, enc} from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private readonly encryptionkey: string = 'ENCRYPTION_KEY_XPQUIZ';

  constructor() {
  }

  public encrypt(value: string): string {
    const encrypted = AES.encrypt(value, this.encryptionkey);
    return encrypted.toString();
  }

  public decrypt(value: string): string {
    const decrypted = AES.decrypt(value, this.encryptionkey);
    return decrypted.toString(enc.Utf8);
  }

  public replacer(key: any, value: any) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }

  public reviver(key: any, value: any) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }
}
