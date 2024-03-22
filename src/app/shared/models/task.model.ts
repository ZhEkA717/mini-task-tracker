import { TypeUser } from './user.model';

export type TaskType = {
  title: string;
  name: string,
  deadline: string,
  priority: TypePriority,
  status: boolean,
  performers: TypeUser[]
};

type TypePriority = 'low' | 'medium' | 'high';
