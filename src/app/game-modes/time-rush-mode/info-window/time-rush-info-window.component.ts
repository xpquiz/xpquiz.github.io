import { PathsEnum } from '@Shared/model/enums/PathsEnum';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseEntity} from "@Shared/database/entity/base.entity";
import {isBefore} from "date-fns";
import {BaseRepository} from "@Shared/database/repository/base.repository";

@Component({
  selector: 'app-info-window',
  templateUrl: './time-rush-info-window.component.html',
  styleUrls: ['./time-rush-info-window.component.sass']
})
export class TimeRushInfoWindowComponent implements OnInit {

  protected readonly PathsEnum = PathsEnum;

  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    private readonly baseRepository: BaseRepository
  ) {
  }

  public async ngOnInit(): Promise<void> {
    const baseEntity: BaseEntity | undefined = await this.baseRepository.findMainBase();

    if (isBefore(new Date(), baseEntity!.nextQuizResponseDate)) {
      await this.router.navigateByUrl(PathsEnum.HOME);
      return;
    }
  }

}
