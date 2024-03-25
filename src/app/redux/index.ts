import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { TASK_REDUCER_KEY, taskReducer } from "./reducers/task.reducer";
import { isDevMode } from "@angular/core";
import { State } from "./state.model";

export const reducers: ActionReducerMap<State> = {
  [TASK_REDUCER_KEY]: taskReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
