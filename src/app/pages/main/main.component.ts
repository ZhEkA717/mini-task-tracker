import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subscription,
} from 'rxjs';
import { createTask, getAllTask, updateTask } from 'src/app/redux/actions/task.action';
import { selectAllTasks, selectLoading } from 'src/app/redux/selectors/task.selector';
import { Task, defaultTaskDto } from 'src/app/shared/models/task.model';
import { DatePeriod } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export default class MainComponent implements OnInit, OnDestroy {
  date = new Date();

  timerId!: ReturnType<typeof setTimeout>;

  links = ['To come', 'Overdue', 'Done'];

  activeLink = this.links[0];

  addTaskVisiable = false;

  period: (typeof DatePeriod)[keyof typeof DatePeriod] = this.getPeriod();

  tasks$: Observable<Task[]> = this.store.select(selectAllTasks);

  tasks: Task[] = [];

  subTask!: Subscription;

  loading$: Observable<boolean> = this.store.select(selectLoading);

  loading = false;

  subLoading!: Subscription;

  taskTitle = '';

  taskDeadline!: Date | null;

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllTask());
    this.subLoading = this.loading$.subscribe((loading) => {
      this.loading = loading;
    });

    this.subTask = this.tasks$.subscribe((tasks) => {
      this.tasks = [...tasks].reverse();
    })

    this.timerId = setInterval(() => {
      this.date = new Date();
      this.getPeriod();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
    this.subLoading?.unsubscribe();
    this.subTask?.unsubscribe();
  }

  openTask(event: Event, id: string) {
    const el = event.target as HTMLElement;
    if (!el.classList.contains('task__checkbox')) this.router.navigate(['/main', id]);
  }

  setInputValue(title: string) {
    this.taskTitle = title;
  }

  setSelected(deadline: Date | null) {
    this.taskDeadline = deadline;
  }

  setStatus(task: Task) {
    const { id, status } = task;
    if (!this.loading) {
      this.store.dispatch(updateTask({
        dto: {
          ...task, status: !status,
        },
        id,
      }));
    }
  }

  visibleControl() {
    this.addTaskVisiable = !this.addTaskVisiable;
  }

  // eslint-disable-next-line class-methods-use-this
  addFocus(el: HTMLInputElement) {
    el.focus();
    el.value = '';
  }

  createTask() {
    this.visibleControl();
    if (!this.loading) {
      this.store.dispatch(createTask({
        dto: {
          ...defaultTaskDto,
          title: this.taskTitle,
          deadline: this.taskDeadline ? this.taskDeadline?.valueOf() : null,
        },
      }));
    }
  }

  changeFilter(link: string) {
    this.activeLink = link;
  }

  getPeriod() {
    const hour = this.date.getHours();
    if (hour >= 0 && hour <= 6) {
      this.period = DatePeriod.NIGHT;
    } else if (hour > 6 && hour <= 12) {
      this.period = DatePeriod.MORNING;
    } else if (hour > 12 && hour <= 18) {
      this.period = DatePeriod.AFTERNOON;
    } else {
      this.period = DatePeriod.EVENING;
    }

    return this.period;
  }
}
