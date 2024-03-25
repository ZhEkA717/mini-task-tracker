import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllTask, updateAllTask, updateTask } from 'src/app/redux/actions/task.action';
import { selectAllTasks } from 'src/app/redux/selectors/task.selector';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-items',
  templateUrl: './task-items.component.html',
  styleUrls: ['./task-items.component.scss'],
})

export default class TaskItemsComponent implements OnInit {

  columns: string[] = ['title', 'name', 'deadline', 'priority', 'status'];

  displayedColumns: string[] = ['select', ...this.columns];

  dataSource = new MatTableDataSource<Task>([]);

  selection = new SelectionModel<Task>(true, []);

  tasks$: Observable<Task[]> = this.store.select(selectAllTasks);

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllTask());
    this.tasks$.subscribe((tasks) => {
      this.dataSource.data = tasks;
    });
  }

  clickOnRow(row: Task) {
    console.log(row.id);
    this.router.navigate(["/main", row.id]);
    this.selection.toggle(row)
  }

  // eslint-disable-next-line class-methods-use-this
  changeStatus(event: MatCheckboxChange, task: Task) {
    this.store.dispatch(updateTask({
      dto: {
        ...task,
        status: event.checked,
      },
      id: task.id,
    }));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(event: MatCheckboxChange) {
    const arr = [...this.dataSource.data.map((task) => ({ ...task, status: event.checked }))];
    this.store.dispatch(updateAllTask({dto: arr}))
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Task): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}
