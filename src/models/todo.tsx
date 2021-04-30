import { TodoTask } from './todo-task'
import { Tag } from './tag'

export class Todo { 
  constructor(
    public Id: number,
    public Title: string,
    public Description: string,
    public Progress: number,
    public IsComplete: boolean,
    public Tasks: TodoTask[],
    public Tags: Tag[]
  ) {}  
}

