import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import HttpApiService from 'src/app/core/services/http-api.service';
import { createTask, getAllTask, getTask, updateTask } from 'src/app/redux/actions/task.action';
import { Task } from 'src/app/shared/models/task.model';
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

  tasks: Task[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAllTask());

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

  createTask() {
    this.store.dispatch(getTask({id: '2f367e10-146a-4698-bfff-6ead52c533ac'}));
  }

  changeFilter(link: string) {
    this.activeLink = link;
  }
}
