import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/shared/models/task.model';
import { createTask, createTaskError, createTaskSuccess, getAllTask, getAllTaskError, getAllTaskSuccess, getTask, getTaskError, getTaskSuccess, saveTask, updateTask, updateTaskError, updateTaskSuccess } from '../actions/task.action';
import { TaskState } from '../models/redux-states';

export const TASK_REDUCER_KEY = 'task';

export const initialState: TaskState = {
  loading: false,
  items: [],
  item: <Task>{}
};

export const taskReducer = createReducer(
  initialState,
  // get all tasks
  on(getAllTask, (state): TaskState => ({
    ...state,
    loading: true,
  })),

  on(getAllTaskSuccess, (state, action): TaskState => ({
    ...state,
    items: action.items,
    loading: action.loading
  })),

  on(getAllTaskError, (state, action): TaskState => ({
    ...state,
    loading: action.loading,
  })),
  // get task
  on(saveTask, (state, action): TaskState => ({
    ...state,
    item: action.task,
  })),

  on(getTask, (state): TaskState => ({
    ...state,
    loading: true,
  })),

  on(getTaskSuccess, (state, action): TaskState => ({
    ...state,
    item: action.item,
    loading: action.loading
  })),

  on(getTaskError, (state, action): TaskState => ({
    ...state,
    loading: action.loading,
  })),
  // create task
  on(createTask, (state): TaskState => ({
    ...state,
    loading: true,
  })),

  on(createTaskSuccess, (state, action): TaskState => ({
    ...state,
    items: [...state.items, action.item],
    loading: action.loading,
  })),

  on(createTaskError, (state, action): TaskState => ({
    ...state,
    loading: action.loading,
  })),
  // update task
  on(updateTask, (state): TaskState => ({
    ...state,
    loading: true,
  })),

  on(updateTaskSuccess, (state, action): TaskState => {
    const { id } = action.item;
    return {
      ...state,
      items: [...state.items.map((task) => {
        if (task.id === id) return action.item;
        return task;
      })],
      item: action.item,
      loading: action.loading,
    }
  }),

  on(updateTaskError, (state, action): TaskState => ({
    ...state,
    loading: action.loading,
  }))
)
