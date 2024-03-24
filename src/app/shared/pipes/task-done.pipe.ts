import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskDone'
})
export default class TaskDonePipe implements PipeTransform {

  transform(tasks: Task[], status: string): Task[] {
    if (status === 'Done')
    return tasks.filter((task) => task.status);
    return tasks;
  }

}
