import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";

@Component({
  selector: 'app-about-window',
  templateUrl: './about-window.component.html',
  styleUrls: ['./about-window.component.sass']
})
export class AboutWindowComponent {

  protected readonly PathsEnum = PathsEnum;

  constructor(
    public readonly router: Router
  ) {
  }

}
