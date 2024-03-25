import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { deleteTask, updateTask } from 'src/app/redux/actions/task.action';
import { selectLoading, selectTask } from 'src/app/redux/selectors/task.selector';
import { Task, TypePriority } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export default class TaskDetailComponent implements OnInit, OnDestroy {

  deadline: Date | undefined;

  task$: Observable<Task> = this.store.select(selectTask);

  task!: Task;

  taskSub!: Subscription;

  loading$: Observable<boolean> = this.store.select(selectLoading);

  loading!: boolean;

  loadingSub!: Subscription;

  titleValue!: string;

  isVisible = false;

  name!: string;

  taskPriority!: TypePriority;

  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.taskSub = this.task$.subscribe((task) => {
      this.task = task;
      this.titleValue = task.title;
      this.name = task.name;
      this.taskPriority = task.priority;
    });

    this.deadline = this.task.deadline ? new Date(this.task.deadline) : undefined;
  }

  ngOnDestroy(): void {
    this.taskSub?.unsubscribe();
    this.loadingSub?.unsubscribe();
  }

  changeName(name: string) {
    if (!this.loading) {
      this.store.dispatch(updateTask({
        dto: {
          ...this.task, name
        },
        id: this.task.id,
      }));
    }
  }

  updatePriority(){
    if (!this.loading) {
      this.store.dispatch(updateTask({
        dto: {
          ...this.task,
          priority: this.taskPriority
        },
        id: this.task.id,
      }));
    }
  }

  updateTaskStatus() {
    if (!this.loading) {
      this.store.dispatch(updateTask({
        dto: {
          ...this.task,
          status: !this.task.status,
          title: this.titleValue,
        },
        id: this.task.id,
      }));
    }
  }

  select(deadline: Date | undefined) {
    if (!this.loading) {
      this.store.dispatch(updateTask({
        dto: {
          ...this.task, deadline: deadline?.valueOf()
        },
        id: this.task.id,
      }));
    }
    setTimeout(() => {
      this.isVisible = !this.isVisible;
    }, 100);
  }

  updateTaskPress(event: KeyboardEvent) {
    const el = event.target as HTMLInputElement;
    if (event.key === 'Enter' && !this.loading) {
      this.updateTask();
      el.blur();
    }
  }

  updateTask() {
    if (!this.loading) {
      this.store.dispatch(updateTask({
        dto: {
          ...this.task,
          title: this.titleValue,
          performers: this.task.performers,
          deadline: this.deadline?.valueOf(),
        },
        id: this.task.id,
      }));
    }
  }

  deletePerformer(index: number) {
    const arr = [...this.task.performers];
    if (index !== 0 && !this.loading) {
      arr.splice(index, 1);
      this.store.dispatch(updateTask({
        dto: {
          ...this.task,
          title: this.titleValue,
          performers: arr,
        },
        id: this.task.id,
      }));
    }
  }

  deleteTask() {
    if (!this.loading) {
      this.store.dispatch(deleteTask({
        id: this.task.id,
      }));
    }
  }

  back() {
    this.router.navigate(['/']);
  }
}
