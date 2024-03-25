import { TypeUser } from './user.model';

export const defaultTaskDto: CreateTaskDto = {
  title: '',
  name: 'task name',
  deadline: null,
  status: false,
  priority: 'low',
  performers: [
    {
      firstName: 'Evgeniy',
      secondName: 'Grushevskiy',
    },
    {
      firstName: 'Darya',
      secondName: 'Grushevskay',
    },
  ],
};

export type Task = {
  id: string
  title: string;
  name: string,
  deadline: number | null,
  priority: TypePriority,
  status: boolean,
  performers: TypeUser[]
};

export type CreateTaskDto = Omit<Task, 'id'>;

export type UpdateTaskDto = Partial<CreateTaskDto>;

export type TypePriority = 'low' | 'medium' | 'high';
