import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export default class TaskComponent implements OnInit {
  deadline: Date | undefined;

  @Input() task: Task = <Task>{};
  @Output() statusEvent = new EventEmitter<Task>();

  ngOnInit(): void {
    this.deadline = this.task.deadline ? new Date(this.task.deadline) : undefined;
  }

  changeStatus() {
    this.statusEvent.emit(this.task);
  }
}
