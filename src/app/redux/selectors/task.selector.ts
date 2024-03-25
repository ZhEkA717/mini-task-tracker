import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "../models/redux-states";
import { TASK_REDUCER_KEY } from "../reducers/task.reducer";

export const selectFeatureTask = createFeatureSelector<TaskState>(TASK_REDUCER_KEY);

export const selectAllTasks = createSelector(
  selectFeatureTask,
  (task: TaskState) => task.items,
);

export const selectTask = createSelector(
  selectFeatureTask,
  (task: TaskState) => task.item,
);

export const selectLoading = createSelector(
  selectFeatureTask,
  (task: TaskState) => task.loading,
)
