import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskOverdue',
})
export default class TaskOverduoPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(tasks: Task[], status: string): Task[] {
    if (status === 'Overdue') {
      return tasks.filter((task) => (
        new Date() > new Date(task.deadline ? task.deadline : '') && !task.status
      ));
    }
    return tasks;
  }
}
