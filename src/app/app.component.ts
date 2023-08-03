import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  private windowReadySound: HTMLAudioElement = new Audio('assets/sounds/startup.wav');

  public async ngOnInit(): Promise<void> {
    await this.windowReadySound.play();
  }
}
