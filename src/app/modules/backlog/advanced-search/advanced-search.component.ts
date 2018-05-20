import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  constructor() { }

  // Select Options
  priorityOptions = [1, 2, 3];
  reporterOptions = ["QA", "PO", "DEV"];
  statusOptions = ["Ready for test", "Done", "Rejected"];

  ngOnInit() {
  }

}
