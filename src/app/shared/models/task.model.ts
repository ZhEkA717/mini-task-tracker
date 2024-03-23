import { TypeUser } from './user.model';

export type Task = {
  id: string
  title: string;
  name: string,
  deadline: number,
  priority: TypePriority,
  status: boolean,
  performers: TypeUser[]
};

export type CreateTaskDto = Omit<Task, 'id'>;

export type UpdateTaskDto = Partial<CreateTaskDto>;

type TypePriority = 'low' | 'medium' | 'high';
