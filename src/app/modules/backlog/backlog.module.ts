import { NgModule } from "@angular/core";
import { SharedModule } from "./../../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { BacklogComponent } from "./backloglist/backlog.component";
import { BugComponent } from "./bug/bug.component";
import { BacklogService } from "./services/backlog.service";
import { CommentsComponent } from "./comments/comments.component";

export const routes: Routes = [
  { path: "backlog", component: BacklogComponent },
  { path: "bug-add", component: BugComponent },
  { path: "bug-edit/:id", component: BugComponent }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [BacklogService],
  declarations: [BacklogComponent, BugComponent, CommentsComponent],
  exports: []
})
export class BackLogModule {}
