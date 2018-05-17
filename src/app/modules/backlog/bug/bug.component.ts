import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Bug, BugModel } from './bug.model';
import { Router } from '@angular/router';
import { BacklogService } from '../services/backlog.service';


@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {

  model: BugModel;
  bugForm: FormGroup;

  // title
  titleFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  titleFormControlErrorMessage = '';
  titleFormControlValidationMessages = {
    required : 'The title is required',
    minlength: 'The minlength is 3 characters'
  };

  // description
  descriptionFormControl = new FormControl('', Validators.required);
  descriptionFormControlErrorMessage = '';
  descriptionFormControlValidationMessages = {
    required : 'The description is required'
  };

  // priority
  priorityFormControl = new FormControl('', Validators.required);
  priorityFormControlErrorMessage = '';
  priorityFormControlValidationMessages = {
    required : 'The priority is required'
  };

  // reporter
  reporterFormControl = new FormControl('', Validators.required);
  reporterFormControlErrorMessage = '';
  reporterFormControlValidationMessages = {
    required : 'The reporter is required'
  };

  // status
  statusFormControl = new FormControl();
  statusFormControlErrorMessage = '';
  statusFormControlValidationMessages = {
    required : 'The status is required'
  };

  // Select Options
  priorityOptions = [1, 2, 3];
  reporterOptions = ['QA', 'PO', 'DEV'];
  statusOptions = ['Ready for test', 'Done', 'Rejected'];

  constructor(private backlogService: BacklogService, private router: Router) { }

  cancel() {
    this.router.navigate(['/backlog']);
  }

  formSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    this.backlogService.saveBug(this.model).subscribe(response => {
      this.router.navigate(['/backlog']);
    });
  }

  ngOnInit() {
    this.model = new BugModel();
    this.bugForm = new FormGroup({
      title: this.titleFormControl,
      description: this.descriptionFormControl,
      priority: this.priorityFormControl,
      reporter: this.reporterFormControl,
      status: this.statusFormControl
    });

    this.titleFormControl.valueChanges.subscribe( (value: string) => {
      this.titleFormControlErrorMessage = '';
      if ((this.titleFormControl.touched || this.titleFormControl.dirty) && this.titleFormControl.errors) {
        this.titleFormControlErrorMessage = Object.keys(this.titleFormControl.errors)
          .map(c => this.titleFormControlValidationMessages[c]).join(' ');
      }
    });

    this.descriptionFormControl.valueChanges.subscribe( (value: string) => {
      this.descriptionFormControlErrorMessage = '';
      if ((this.descriptionFormControl.touched || this.descriptionFormControl.dirty) && this.descriptionFormControl.errors) {
        this.descriptionFormControlErrorMessage = Object.keys(this.descriptionFormControl.errors)
          .map(c => this.descriptionFormControlValidationMessages[c]).join(' ');
      }
    });

    this.priorityFormControl.valueChanges.subscribe( (value: string) => {
      this.priorityFormControlErrorMessage = '';
      if ((this.priorityFormControl.touched || this.priorityFormControl.dirty) && this.priorityFormControl.errors) {
        this.priorityFormControlErrorMessage = Object.keys(this.priorityFormControl.errors)
          .map(c => this.priorityFormControlValidationMessages[c]).join(' ');
      }
    });

    this.reporterFormControl.valueChanges.subscribe( (value: string) => {
      this.reporterFormControlErrorMessage = '';
      if ((this.reporterFormControl.touched || this.reporterFormControl.dirty) && this.reporterFormControl.errors) {
        this.reporterFormControlErrorMessage = Object.keys(this.reporterFormControl.errors)
          .map(c => this.reporterFormControlValidationMessages[c]).join(' ');
      }

      if (value && value === 'QA') {
        this.statusFormControl.setValidators(Validators.required);
      } else {
        this.statusFormControl.clearValidators();
      }
      this.statusFormControl.updateValueAndValidity();
    });

    this.statusFormControl.valueChanges.subscribe( (value: string) => {
      this.statusFormControlErrorMessage = '';
      if ((this.statusFormControl.touched || this.statusFormControl.dirty) && this.statusFormControl.errors) {
        this.statusFormControlErrorMessage = Object.keys(this.statusFormControl.errors)
          .map(c => this.statusFormControlValidationMessages[c]).join(' ');
      }
    });

  }

}
