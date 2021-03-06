
import { NgModule } from "@angular/core";
import { SharedModule } from "./../../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { BacklogComponent } from "./backloglist/backlog.component";
import { BugComponent } from "./bug/bug.component";
import { BacklogService } from "./services/backlog.service";
import { CommentsComponent } from "./comments/comments.component";
import { PagerComponent } from "../../shared/pager/pager.component";
import { CanDeactivateGuard } from "../../shared/can-deactivate-guard.service";
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

export const routes: Routes = [
  { path: "backlog", component: BacklogComponent },
  { path: "bug-add", component: BugComponent, canDeactivate: [CanDeactivateGuard] },
  { path: "bug-edit/:id", component: BugComponent , canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [BacklogService, CanDeactivateGuard],
  declarations: [BacklogComponent, BugComponent, CommentsComponent, AdvancedSearchComponent],
  exports: []
})
export class BackLogModule {}
