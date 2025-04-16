import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {WindowTab} from "@Shared/model/WindowTab";
import {AllTimeScoreComponent} from "../all-time-score/all-time-score.component";
import {ModeScoreComponent} from "../mode-score/mode-score.component";

@Component({
  selector: 'app-score-window',
  templateUrl: './score-window.component.html',
  styleUrls: ['./score-window.component.sass']
})
export class ScoreWindowComponent {

  public windowTabs: WindowTab[] = [
    {
      id: 'tab-all-time',
      title: 'All time',
      selected: true,
      component: AllTimeScoreComponent
    },
    {
      id: 'tab-mode',
      title: 'By mode',
      selected: false,
      component: ModeScoreComponent
    },
    {
      id: 'tab-history',
      title: 'Game history',
      selected: false,
      component: undefined
    },
  ];

  protected readonly PathsEnum = PathsEnum;

  constructor(
    protected readonly router: Router,
  ) {
  }

  public changeSelectedTab(selectedTab: WindowTab): void {
    if (selectedTab.selected)
      return;

    this.windowTabs.forEach(tab => {
      tab.selected = selectedTab.id === tab.id
    })
  }
}
