import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.sass']
})
export class IconButtonComponent {

  @Input()
  public title: string = '';
  @Input()
  public iconPath: string = '';
  @Input()
  public disabled: boolean = false;
  @Output()
  public onButtonClick: EventEmitter<void> = new EventEmitter<void>();

  public readonly iconSize: number = 20;

  public onClick(): void {
    this.onButtonClick.emit();
  }

}
