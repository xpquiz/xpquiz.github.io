import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/PathsEnum";
import {AppStorage} from "../../model/AppStorage";

@Component({
  selector: 'app-score-window',
  templateUrl: './score-window.component.html',
  styleUrls: ['./score-window.component.sass']
})
export class ScoreWindowComponent implements OnInit {
  public score: number = 0;

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {
  }

  public ngOnInit(): void {
    const appStorage: AppStorage = this.storageService.get();
    this.score = appStorage.currentScore;
  }

  public async returnHome(): Promise<void> {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

}
