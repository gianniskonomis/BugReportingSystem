import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BugModel } from "../bug/bug.model";

@Injectable()
export class BacklogService {

  private bugEndPoint = "http://localhost:3001/bugs";

  constructor(private http: HttpClient) { }

  getBugs(
    sortBy: string,
    isSortAsc: boolean,
    page: number = 0,
    size: number = 10
  ): Observable<Array<BugModel>> {
    const sortType = isSortAsc ? "asc" : "desc";

    let params = new HttpParams();
    params = params.append("sort", `${sortBy},${sortType}`);
    params = params.append("page", page.toString());
    params = params.append("size", size.toString());

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
