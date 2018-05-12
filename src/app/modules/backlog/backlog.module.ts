import { NgModule } from "@angular/core";
import { SharedModule } from "./../../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { BacklogComponent } from "./backloglist/backlog.component";
import { BugComponent } from "./bug/bug.component";
import { BacklogService } from "../../services/backlog.service";

export const routes: Routes = [
  { path: '', redirectTo: 'backlog', pathMatch: 'full' },
  { path: 'backlog', component: BacklogComponent },
  { path: 'bug', component: BugComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [BacklogService],
  declarations: [BacklogComponent, BugComponent],
  exports: []
})
export class BackLogModule {

}

