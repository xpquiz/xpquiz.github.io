import {Injectable} from '@angular/core';
import {AES, enc} from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private readonly encryptionkey: string = 'ENCRYPTION_KEY_XPQUIZ';

  public encrypt(value: string): string {
    const encrypted = AES.encrypt(value, this.encryptionkey);
    return encrypted.toString();
  }

  public decrypt(value: string): string {
    const decrypted = AES.decrypt(value, this.encryptionkey);
    return decrypted.toString(enc.Utf8);
  }
}
