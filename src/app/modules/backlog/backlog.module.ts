import { NgModule } from "@angular/core";
import { SharedModule } from "./../../shared/shared.module";
import { BacklogComponent } from "./backloglist/backlog.component";
import { BugComponent } from "./bug/bug.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [BacklogComponent,BugComponent],
  exports: []
})
export class BackLogModule {

}
