import {Injectable} from '@angular/core';
import {TemplateEnum, TemplateParams} from "../model/enums/Template";
import Mustache from "mustache";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  public async render(template: TemplateEnum, params: TemplateParams): Promise<string> {
    const templateString: string = await firstValueFrom(this.http.get(template, {responseType: 'text'}));

    return Mustache.render(templateString, params);
  }
}

