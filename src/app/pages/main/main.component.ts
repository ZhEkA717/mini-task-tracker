import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createTask, getAllTask, updateTask } from 'src/app/redux/actions/task.action';
import { selectAllTasks } from 'src/app/redux/selectors/task.selector';
import { CreateTaskDto, Task, defaultTaskDto } from 'src/app/shared/models/task.model';
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

  period: (typeof DatePeriod)[keyof typeof DatePeriod] = this.getPeriod();

  tasks$!: Observable<Task[]>;

  taskTitle: string = '';
  taskDeadline!: Date | null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAllTask());
    this.tasks$  = this.store.select(selectAllTasks);

    this.timerId = setInterval(() => {
      this.date = new Date();
      this.getPeriod();
    });
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

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  setInputValue(title: string) {
    this.taskTitle = title;
  }

  setSelected(deadline: Date|null) {
    this.taskDeadline = deadline;
  }

  setStatus(task: Task) {
    const {id, status} = task;
    this.store.dispatch(updateTask({dto: {
      ...task, status: !status,
    }, id}))
  }



  createTask() {
    this.store.dispatch(createTask({dto: {
      ...defaultTaskDto,
      title: this.taskTitle,
      deadline: this.taskDeadline ? this.taskDeadline?.valueOf() : null
    }}))
  }

  changeFilter(link: string) {
    this.activeLink = link;
  }
}
