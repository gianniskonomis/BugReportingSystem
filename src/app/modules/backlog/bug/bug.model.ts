import { Comment } from "../comments/comment.model";

export class BugModel {
  public priority: number;
  public title: string;
  public reporter: string;
  public status: string;
  public description: string;
  public updatedAt: string;
  public createdAt: string;
  public comments: Comment[];
  constructor() {}
}
