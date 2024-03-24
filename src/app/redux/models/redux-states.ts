import { Task } from 'src/app/shared/models/task.model';

export type TaskState = {
  loading: boolean;
  items: Task[];
  item: Task;
}
