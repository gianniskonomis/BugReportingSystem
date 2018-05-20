import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-pager",
  templateUrl: "./pager.component.html",
  styleUrls: ["./pager.component.css"]
})
export class PagerComponent implements OnInit {
  constructor() {}
  @Input() page: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter();
  @Output() pageSizeChanged = new EventEmitter();

  ngOnInit() {}

  changePage(forward) {
    if (forward === false && this.page === 0) {
      return;
    }
    this.pageChanged.emit(forward);
  }

  onPageSizeValueChange(pageSizeValue) {
    this.pageSizeChanged.emit(pageSizeValue);
  }

  
}
