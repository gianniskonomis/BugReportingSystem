import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Bug, BugModel } from './bug.model';
import { Router } from "@angular/router";
import { BacklogService } from '../../../services/backlog.service';


@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {

  model: BugModel;
  priorityOptions = [1, 2, 3];
  reporterOptions = ['QA', 'PO', 'DEV'];
  statusOptions = ['Ready for test', 'Done', 'Rejected'];

  constructor(private backlogService: BacklogService, private router: Router) { }

  formSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    this.backlogService.saveBug(this.model).subscribe(response => {
      this.router.navigate(['/backlog']);
    });
  }

  ngOnInit() {
    this.model = new BugModel();
    this.model.status = undefined;
  }


}
