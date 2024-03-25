import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export default class AddTaskComponent implements AfterViewInit {
  @Output() inputValueEvent = new EventEmitter<string>();

  @Output() selectedEvent = new EventEmitter<Date | null>();

  @Output() inputControlEvent = new EventEmitter<HTMLInputElement>();

  @Output() blurEvent = new EventEmitter<true>();

  isVisible = false;

  title = '';

  deadline!: Date | null;

  @ViewChild('inputControl') inputControl!: ElementRef;

  ngAfterViewInit(): void {
    this.inputControlEvent.emit(this.inputControl.nativeElement);
  }

  createTask(event: KeyboardEvent) {
    if (event.key === 'Enter') this.blurEvent.emit(true);
  }

  updateInputValue() {
    this.inputValueEvent.emit(this.title);
  }

  select(deadline: Date | undefined) {
    this.inputControl.nativeElement.focus();
    setTimeout(() => {
      this.isVisible = !this.isVisible;
    }, 100);
    this.selectedEvent.emit(deadline);
  }
}
