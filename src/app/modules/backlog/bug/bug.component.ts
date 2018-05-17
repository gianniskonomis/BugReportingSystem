import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { NgForm } from "@angular/forms";
import { Bug, BugModel } from "./bug.model";
import { ActivatedRoute, Router } from "@angular/router";
import { BacklogService } from "../services/backlog.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-bug",
  templateUrl: "./bug.component.html",
  styleUrls: ["./bug.component.css"]
})
export class BugComponent implements OnInit {
  model: BugModel;
  priorityOptions = [1, 2, 3];
  reporterOptions = ["QA", "PO", "DEV"];
  statusOptions = ["Ready for test", "Done", "Rejected"];

  constructor(
    private backlogService: BacklogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  sub: Subscription;

  cancel() {
    this.router.navigate(["/backlog"]);
  }

  formSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.backlogService.save(this.model).subscribe(response => {
      this.router.navigate(["/backlog"]);
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.backlogService.get(id).subscribe((bug: Bug) => {
          if (bug) {
            this.model = bug;
          } else {
            console.log(`Bug with id '${id}' not found, returning to list`);
            this.cancel();
          }
        });
      } else {
        this.model = new BugModel();
        this.model.status = undefined;
      }
    });
  }
}
