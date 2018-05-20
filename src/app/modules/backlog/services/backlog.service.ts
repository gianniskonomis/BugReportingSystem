import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BugModel } from "../bug/bug.model";
import { environment } from "../../../../environments/environment";

@Injectable()
export class BacklogService {
  private bugEndPoint = environment.bugEndPoint;

  constructor(private http: HttpClient) {}

  getBugs(
    sortBy: string,
    isSortAsc: boolean,
    page: number = 0,
    size: number = 10,
    title: string = null,
    priority: string = null,
    reporter: string = null,
    status: string = null
  ): Observable<Array<BugModel>> {
    const sortType = isSortAsc ? "asc" : "desc";

    let params = new HttpParams();
    params = params.append("sort", `${sortBy},${sortType}`);
    params = params.append("page", page.toString());
    params = params.append("size", size.toString());

    if (title) {
      params = params.append("title", title.toString());
    }
    if (priority) {
      params = params.append("priority", priority);
    }
    if (reporter) {
      params = params.append("reporter", reporter);
    }

    if (status) {
      params = params.append("status", status.toString());
    }
    return this.http.get<Array<BugModel>>(this.bugEndPoint, { params: params });
  }

  get(id: string): Observable<BugModel> {
    return this.http.get<BugModel>(`${this.bugEndPoint}/${id}`);
  }

  delete(id: string): Observable<BugModel> {
    return this.http.delete<BugModel>(`${this.bugEndPoint}/${id}`);
  }

  save(model: any): Observable<any> {
    let result: Observable<Object>;
    if (model.id) {
      result = this.http.put(`${this.bugEndPoint}/${model.id}`, model);
    } else {
      result = this.http.post(this.bugEndPoint, model);
    }
    return result;
  }
}
