import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppheaderComponent } from "./appheader/appheader.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [AppheaderComponent],
  exports: [
    AppheaderComponent
  ]
})
export class CoreModule {

}
