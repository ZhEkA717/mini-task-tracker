import { TaskState } from "./models/redux-states";
import { TASK_REDUCER_KEY } from "./reducers/task.reducer";

export interface State {
  [TASK_REDUCER_KEY]: TaskState,
}
