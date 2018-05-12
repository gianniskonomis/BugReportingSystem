import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Bug } from './bug.model';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {

  model: Bug;
  priorityOptions = [1, 2, 3];
  reporterOptions = ['QA', 'PO', 'DEV'];
  statusOptions = ['Ready for test', 'Done', 'Rejected'];

  constructor() { }

  formSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    console.log(form.value);
  }

  ngOnInit() {
    this.model = new Bug(null, null, null, null, null, null, null);
  }


}
