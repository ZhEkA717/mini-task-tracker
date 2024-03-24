import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskCome'
})
export class TaskComePipe implements PipeTransform {

  transform(tasks: Task[], status: string): Task[] {
    if (status === 'To come')
    return tasks.filter((task) => !task.status && new Date() <= new Date(task.deadline ? task.deadline : new Date()));
    return tasks;
  }

}
