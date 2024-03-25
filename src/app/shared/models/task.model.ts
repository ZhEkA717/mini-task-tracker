import { TypeUser } from './user.model';

export const defaultTaskDto: CreateTaskDto = {
  title: '',
  name: '',
  deadline: null,
  status: false,
  priority: 'low',
  performers: [{
    firstName: 'Zheka',
    secondName: 'Grushevskiy'
  },
]
}

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

type TypePriority = 'low' | 'medium' | 'high';
