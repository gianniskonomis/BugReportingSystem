import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";

import { BackLogModule } from "./modules/backlog/backlog.module";

const appRoutes: Routes = [
  { path: "",  redirectTo: "/bugs", pathMatch: "full" },
 ];

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    CoreModule,
    BrowserModule,
    BackLogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ ],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
