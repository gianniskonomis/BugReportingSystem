import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
/* import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal/modal.component"; */

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
 // constructor(private modalService: NgbModal) {}

   canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  /*   debugger;
    const deactivate = component.canDeactivate
      ? component.canDeactivate()
      : true;
    if (deactivate) {
      return true;
    }
    return true;
   this.modalService.open(ModalComponent).result.then(
      result => {
        debugger;
      },
      reason => {
        debugger;
      } */
  }
}
