import { Comment } from "../comments/comment.model";

export class Bug {
  constructor(public title: string,
    public description: string,
    public priority: number,
    public reporter: string,
    public status: string,
    public updatedAt: string,
    public createdAt: string,
    public comments: Comment[]) {}
}

export class BugModel {
  constructor() {}
  public priority: number;
  public title: string;
  public reporter: string;
  public status: string;
  public description: string;
  public comments: Comment[];
}
