import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal/modal.component";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  constructor(private modalService: NgbModal) {}

  canDeactivate(component: CanComponentDeactivate) {
    if (!component.canDeactivate()) {
      return window.confirm("Dude !!!!! Are you sure????");
    }
    return true;
  }
}
