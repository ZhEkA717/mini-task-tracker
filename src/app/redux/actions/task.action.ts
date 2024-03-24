import { createAction, props } from '@ngrx/store';
import { CreateTaskDto, Task, UpdateTaskDto } from 'src/app/shared/models/task.model';

export enum TaskAction {
  getAllTask = '[TASK] get all task',
  getAllTaskError = '[TASK] get all task error',
  getAllTaskSuccess = '[TASK] get  all task success',

  getTask = '[TASK] get one task',
  getTaskError = '[TASK] get one task error',
  getTaskSuccess = '[TASK] get  one task success',

  createTask = '[TASK] create task',
  createTaskSuccess = '[TASK] create task success',
  createTaskError = '[TASK] create task error',

  updateTask = '[TASK] update task',
  updateTaskSuccess = '[TASK] update task success',
  updateTaskError = '[TASK] update task error',
};
// get all tasks
export const getAllTask = createAction(
  TaskAction.getAllTask,
);
export const getAllTaskSuccess = createAction(
  TaskAction.getAllTaskSuccess,
  props<{
    items: Task[],
    loading: boolean
  }>(),
);
export const getAllTaskError = createAction(
  TaskAction.getAllTaskError,
  props<{ loading: boolean }>(),
);
// get one tasks
export const getTask = createAction(
  TaskAction.getTask,
  props<{id: string}>()
);
export const getTaskSuccess = createAction(
  TaskAction.getTaskSuccess,
  props<{
    item: Task,
    loading: boolean
  }>(),
);
export const getTaskError = createAction(
  TaskAction.getTaskError,
  props<{ loading: boolean }>(),
);
// create tasks
export const createTask = createAction(
  TaskAction.createTask,
  props<{dto: CreateTaskDto}>()
);
export const createTaskSuccess = createAction(
  TaskAction.createTaskSuccess,
  props<{item: Task, loading: boolean}>()
);
export const createTaskError = createAction(
  TaskAction.createTaskError,
  props<{loading: boolean}>()
);

// update tasks
export const updateTask = createAction(
  TaskAction.updateTask,
  props<{dto: UpdateTaskDto, id: string}>()
);
export const updateTaskSuccess = createAction(
  TaskAction.updateTaskSuccess,
  props<{item: Task, loading: boolean}>()
);
export const updateTaskError = createAction(
  TaskAction.updateTaskError,
  props<{loading: boolean}>()
);

