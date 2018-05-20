import { Component, OnInit, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "app-advanced-search",
  templateUrl: "./advanced-search.component.html",
  styleUrls: ["./advanced-search.component.css"]
})
export class AdvancedSearchComponent implements OnInit {
  constructor() {}

  @Output() initiateAdvancedSearch = new EventEmitter();

  // Select Options
  priorityOptions = [1, 2, 3];
  reporterOptions = ["QA", "PO", "DEV"];
  statusOptions = ["Ready for test", "Done", "Rejected"];

  priority: string;
  reporter: string;
  status: string;
  title: string;

  ngOnInit() {}


  executeSearch() {
    this.initiateAdvancedSearch.emit({
      priority: this.priority,
      reporter: this.reporter,
      title: this.title,
      status: this.status
    });
  }
}
