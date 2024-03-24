import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export default class AddTaskComponent {

  @Output() inputValueEvent = new EventEmitter<string>()
  @Output() selectedEvent = new EventEmitter<Date | null>()

  isVisible = false;

  title: string = '';
  deadline!: Date | null;


  updateInputValue() {
    this.inputValueEvent.emit(this.title);
  }

  select(deadline: Date | undefined) {
    this.selectedEvent.emit(deadline);
  }
}
