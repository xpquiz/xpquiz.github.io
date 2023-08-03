import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {Router} from "@angular/router";
import {StorageKeyEnum} from "../../model/StorageKeyEnum";
import {PathsEnum} from "../../model/PathsEnum";

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
    const currentScore: string | null = this.storageService.get(StorageKeyEnum.CURRENT_SCORE);

    this.score = currentScore === null ? 0 : parseInt(currentScore);
  }

  public async returnHome(): Promise<void> {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

}
