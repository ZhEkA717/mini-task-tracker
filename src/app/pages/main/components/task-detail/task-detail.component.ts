import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { updateTask } from 'src/app/redux/actions/task.action';
import { selectTask } from 'src/app/redux/selectors/task.selector';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export default class TaskDetailComponent implements OnInit, OnDestroy {
  deadline: Date | undefined;
  task$: Observable<Task> = this.store.select(selectTask);
  task!: Task;
  taskSub!: Subscription;
  titleValue!: string;
  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.taskSub = this.task$.subscribe((task) => {
      this.task = task;
      this.titleValue = task.title;
    })
    this.deadline = this.task.deadline ? new Date(this.task.deadline) : undefined;
  }

  ngOnDestroy(): void {
    this.taskSub?.unsubscribe();
  }

  updateTaskStatus() {
    this.store.dispatch(updateTask({dto: {
      ...this.task,
      status: !this.task.status,
      title: this.titleValue,
    }, id: this.task.id}));
  }

  updateTaskPress(event: KeyboardEvent) {
    const el = event.target as HTMLInputElement;
    if(event.key === 'Enter') {
      this.updateTask();
      el.blur();
    }
  }

  updateTask() {
    this.store.dispatch(updateTask({dto: {
      ...this.task,
      title: this.titleValue,
      performers: this.task.performers
    }, id: this.task.id}));
  }

  deletePerformer(index: number) {
    const arr = [...this.task.performers];
    if (index !== 0) {
      arr.splice(index, 1);
      this.store.dispatch(updateTask({dto: {
        ...this.task,
        title: this.titleValue,
        performers: arr
      }, id: this.task.id}));
    }
  }

  back() {
    this.router.navigate(['/']);
  }

}
