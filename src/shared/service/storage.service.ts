import {Injectable} from '@angular/core';
import {AppStorage} from "../model/AppStorage";
import {EncryptionService} from "./encryption.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly localStorage: Storage;
  private readonly storageKey: string = 'app_storage_v2'

  constructor(
    private readonly encryptionService: EncryptionService
  ) {
    this.localStorage = window.localStorage;
  }

  public save(value: AppStorage): void {
    const stringfiedObject: string = JSON.stringify(value, this.encryptionService.replacer);
    const encryptedObject: string = this.encryptionService.encrypt(stringfiedObject);

    this.localStorage.setItem(this.storageKey, encryptedObject);
  }

  public get(): AppStorage | null {
    const encryptedItem: string | null = this.localStorage.getItem(this.storageKey);

    if (encryptedItem === null || encryptedItem === '')
      return null;
    else
      return JSON.parse(this.encryptionService.decrypt(encryptedItem), this.encryptionService.reviver);
  }

}
