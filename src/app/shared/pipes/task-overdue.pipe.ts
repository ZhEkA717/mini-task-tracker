import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskOverduo'
})
export class TaskOverduoPipe implements PipeTransform {

  transform(tasks: Task[], status: string ): Task[] {
    if(status === 'Overdue') {
      return tasks.filter((task) => (
        new Date() > new Date(task.deadline ? task.deadline : '') && !task.status
      ))
    }
    return tasks;
  }

}
