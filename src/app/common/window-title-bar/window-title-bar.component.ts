import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-window-title-bar',
  templateUrl: './window-title-bar.component.html',
  styleUrls: ['./window-title-bar.component.sass']
})
export class WindowTitleBarComponent {

  @Input()
  public title: string = '';
  @Input()
  public iconPath: string = '';

  public readonly iconSize: number = 15;
}
