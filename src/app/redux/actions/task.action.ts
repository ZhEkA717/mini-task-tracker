import { createAction, props } from '@ngrx/store';
import { CreateTaskDto, Task, UpdateTaskDto } from 'src/app/shared/models/task.model';

export enum TaskAction {
  getAllTask = '[TASK] get all task',
  getAllTaskError = '[TASK] get all task error',
  getAllTaskSuccess = '[TASK] get  all task success',

  saveTask = '[TASK] save task',
  getTask = '[TASK] get one task',
  getTaskError = '[TASK] get one task error',
  getTaskSuccess = '[TASK] get  one task success',

  createTask = '[TASK] create task',
  createTaskSuccess = '[TASK] create task success',
  createTaskError = '[TASK] create task error',

  updateTask = '[TASK] update task',
  updateTaskSuccess = '[TASK] update task success',
  updateTaskError = '[TASK] update task error',

  updateAllTask = '[TASK] update all task',
  updateAllTaskSuccess = '[TASK] update all task success',
  updateAllTaskError = '[TASK] update all task error',

  deleteTask = '[TASK] delete task',
  deleteTaskSuccess = '[TASK] delete task success',
  deleteTaskError = '[TASK] delete task error',
};
// get all task
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
// get one task
export const saveTask = createAction(
  TaskAction.saveTask,
  props<{task: Task}>()
);
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
// create task
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

// update task
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

// update alll tasks
export const updateAllTask = createAction(
  TaskAction.updateAllTask,
  props<{ dto: Task[] }>()
);
export const updateAllTaskSuccess = createAction(
  TaskAction.updateAllTaskSuccess,
  props<{items: Task[], loading: boolean}>()
);
export const updateAllTaskError = createAction(
  TaskAction.updateAllTaskError,
  props<{loading: boolean}>()
);

// delete  task
export const deleteTask = createAction(
  TaskAction.deleteTask,
  props<{ id: string }>()
);
export const deleteTaskSuccess = createAction(
  TaskAction.deleteTaskSuccess,
  props<{id: string, loading: boolean}>()
);
export const deleteTaskError = createAction(
  TaskAction.deleteTaskError,
  props<{loading: boolean}>()
);

