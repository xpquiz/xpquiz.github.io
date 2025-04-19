import {NgModule} from "@angular/core";
import {ScorePipe} from "@Shared/pipes/score.pipe";


@NgModule({
  declarations: [ScorePipe],
  exports: [ScorePipe]
})
export class PipesModule {

}
