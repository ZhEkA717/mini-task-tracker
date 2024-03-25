import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskCome',
})
export default class TaskComePipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(tasks: Task[], status: string): Task[] {
    if (status === 'To come') {
      return tasks
        .filter((task) => !task.status && new Date() <= new Date(task.deadline
          ? task.deadline : new Date()));
    }
    return tasks;
  }
}
