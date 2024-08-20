import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-icon-text-button',
  templateUrl: './icon-text-button.component.html',
  styleUrls: ['./icon-text-button.component.sass']
})
export class IconTextButtonComponent {

  @Input()
  public iconPath: string = '';
  @Input()
  public title: string = '';
  @Input()
  public description: string = '';
  @Output()
  public onButtonClick: EventEmitter<void> = new EventEmitter<void>();

  public readonly iconSize: number = 30;

  public onClick(): void {
    this.onButtonClick.emit();
  }

}
