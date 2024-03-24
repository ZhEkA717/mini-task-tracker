import { Component } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export default class AddTaskComponent {
  selected!: Date | null;

  isVisible = false;
}
