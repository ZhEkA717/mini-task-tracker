import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePeriod } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export default class MainComponent implements OnInit, OnDestroy {
  date = new Date();

  timerId!: ReturnType<typeof setTimeout>;;

  links = ['To come', 'Overdue', 'Done'];

  activeLink = this.links[0];

  period!: (typeof DatePeriod)[keyof typeof DatePeriod];


  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.date = new Date();

      let hour = this.date.getHours();

      if (hour > 0 &&  hour < 6) {
        this.period = DatePeriod.NIGHT;
      } else if (hour > 6 && hour < 12) {
        this.period = DatePeriod.MORNING;
      } else if (hour > 12 && hour < 18) {
        this.period = DatePeriod.AFTERNOON;
      } else {
        this.period = DatePeriod.EVENING;
      }

    })
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  changeFilter(link: string) {
    this.activeLink = link;
  }
}
