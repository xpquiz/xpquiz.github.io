import {Injectable} from '@angular/core';
import {TemplateEnum, TemplateParams} from "../model/enums/Template";
import * as Mustache from "mustache";
import fs from "fs";

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor() {
  }

  public render(template: TemplateEnum, params: TemplateParams): string {
    const stringTemplate: string = fs.readFileSync(template, {encoding: 'utf8'});

    return Mustache.render(stringTemplate, params);
  }
}

