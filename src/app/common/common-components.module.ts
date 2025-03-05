import {NgModule} from '@angular/core';
import {IconButtonComponent} from "./icon-button/icon-button.component";
import {IconTextButtonComponent} from "./icon-text-button/icon-text-button.component";
import {WindowTitleBarComponent} from "./window-title-bar/window-title-bar.component";
import {NgClass, NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    IconButtonComponent,
    IconTextButtonComponent,
    WindowTitleBarComponent,
  ],
  imports: [NgOptimizedImage, NgClass],
  exports: [
    IconButtonComponent,
    IconTextButtonComponent,
    WindowTitleBarComponent,
  ]
})
export class CommonComponentsModule {
}
