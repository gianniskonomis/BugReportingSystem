import { Component, OnInit, Output } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { NgForm } from "@angular/forms";
import { BugModel } from "./bug.model";
import { ActivatedRoute, Router } from "@angular/router";
import { BacklogService } from "../services/backlog.service";
import { Subscription } from "rxjs/Subscription";
import { Comment } from "../comments/comment.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-bug",
  templateUrl: "./bug.component.html",
  styleUrls: ["./bug.component.css"]
})
export class BugComponent implements OnInit {

  @Output() comments: Comment[];
  model: BugModel;
  comment: Comment;
  bugForm: FormGroup;
  commentForm: FormGroup;
  sub: Subscription;

  // title
  titleFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3)
  ]);
  titleFormControlErrorMessage = "";
  titleFormControlValidationMessages = {
    required: "The title is required",
    minlength: "The minlength is 3 characters"
  };

  // description
  descriptionFormControl = new FormControl("",
   Validators.required
  );
  descriptionFormControlErrorMessage = "";
  descriptionFormControlValidationMessages = {
    required: "The description is required"
  };

  // priority
  priorityFormControl = new FormControl("",
    Validators.required
  );
  priorityFormControlErrorMessage = "";
  priorityFormControlValidationMessages = {
    required: "The priority is required"
  };

  // reporter
  reporterFormControl = new FormControl("",
    Validators.required
  );
  reporterFormControlErrorMessage = "";
  reporterFormControlValidationMessages = {
    required: "The reporter is required"
  };

  // status
  statusFormControl = new FormControl();
  statusFormControlErrorMessage = "";
  statusFormControlValidationMessages = {
    required: "The status is required"
  };

  // Comment Reporter
  commentReporterFormControl = new FormControl();

  // Commnet Description
  commentDescriptionFormControl = new FormControl();

  // Select Options
  priorityOptions = [1, 2, 3];
  reporterOptions = ["QA", "PO", "DEV"];
  statusOptions = ["Ready for test", "Done", "Rejected"];

  constructor(
    private backlogService: BacklogService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  addComment() {
    if (!this.comment.reporter || !this.comment.description) {
      this.toastr.warning(
        `You didn't add a comment`
      );
      return;
    } else {
      this.model.comments.push(this.comment);
      this.comment.reporter = undefined;
      this.comment.description = undefined;
    }
  }

  cancel() {
    this.router.navigate(["/backlog"]);
  }

  formSubmit(bug: FormGroup, comment: FormGroup) {
    if (!bug.valid || !comment.valid) {
      return;
    }

    this.backlogService.save(this.model).subscribe(response => {
      this.toastr.success(`Bug Saved`);
      this.router.navigate(["/backlog"]);
    });
  }

  ngOnInit() {
    this.bugForm = new FormGroup({
      title: this.titleFormControl,
      description: this.descriptionFormControl,
      priority: this.priorityFormControl,
      reporter: this.reporterFormControl,
      status: this.statusFormControl,
    });
    this.commentForm = new FormGroup({
      commentReporter: this.commentReporterFormControl,
      commentDescription: this.commentDescriptionFormControl
    });

    // Validations
    this.titleFormControl.valueChanges.subscribe((value: string) => {
      this.titleFormControlErrorMessage = "";
      if ((this.titleFormControl.touched || this.titleFormControl.dirty) &&
          this.titleFormControl.errors
      ) {
          this.titleFormControlErrorMessage = Object.keys(this.titleFormControl.errors)
          .map(c => this.titleFormControlValidationMessages[c])
          .join(" ");
      }
    });

    this.descriptionFormControl.valueChanges.subscribe((value: string) => {
      this.descriptionFormControlErrorMessage = "";
      if ((this.descriptionFormControl.touched || this.descriptionFormControl.dirty) &&
          this.descriptionFormControl.errors
      ) {
          this.descriptionFormControlErrorMessage = Object.keys(this.descriptionFormControl.errors)
          .map(c => this.descriptionFormControlValidationMessages[c])
          .join(" ");
      }
    });

    this.priorityFormControl.valueChanges.subscribe((value: string) => {
      this.priorityFormControlErrorMessage = "";
      if ((this.priorityFormControl.touched || this.priorityFormControl.dirty) &&
          this.priorityFormControl.errors
      ) {
          this.priorityFormControlErrorMessage = Object.keys(this.priorityFormControl.errors)
          .map(c => this.priorityFormControlValidationMessages[c])
          .join(" ");
      }
    });

    this.reporterFormControl.valueChanges.subscribe((value: string) => {
      this.reporterFormControlErrorMessage = "";
      if ((this.reporterFormControl.touched || this.reporterFormControl.dirty) &&
          this.reporterFormControl.errors
      ) {
          this.reporterFormControlErrorMessage = Object.keys(this.reporterFormControl.errors)
          .map(c => this.reporterFormControlValidationMessages[c])
          .join(" ");
      }

      if (value && value === "QA") {
        this.statusFormControl.setValidators(Validators.required);
      } else {
        this.statusFormControl.clearValidators();
      }
      this.statusFormControl.updateValueAndValidity();
    });

    this.statusFormControl.valueChanges.subscribe((value: string) => {
      this.statusFormControlErrorMessage = "";
      if ((this.statusFormControl.touched || this.statusFormControl.dirty) &&
          this.statusFormControl.errors
      ) {
          this.statusFormControlErrorMessage = Object.keys(this.statusFormControl.errors)
          .map(c => this.statusFormControlValidationMessages[c])
          .join(" ");
      }
    });

    this.sub = this.route.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.backlogService.get(id).subscribe((bug: BugModel) => {
            this.model = bug;
        }, err => {
          this.toastr.error(
            `Bug with id '${id}' not found, returning to list`
          );
          this.cancel();
        });
      } else {
        this.model = new BugModel();
        this.comment = new Comment();
      }
    });
  }
}
