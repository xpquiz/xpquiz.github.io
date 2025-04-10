import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CopyClipboardDirective} from "./copy-clipboard.directive";


@NgModule({
  declarations: [CopyClipboardDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CopyClipboardDirective
  ]
})
export class DirectivesModule {
}
