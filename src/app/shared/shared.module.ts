import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
import { PagerComponent } from "./pager/pager.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal/modal.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    })
  ],
  declarations: [PagerComponent, ModalComponent],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, PagerComponent, NgbModule],
})
export class SharedModule {}
