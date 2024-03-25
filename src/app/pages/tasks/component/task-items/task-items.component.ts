import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllTask, updateAllTask, updateTask } from 'src/app/redux/actions/task.action';
import { selectAllTasks } from 'src/app/redux/selectors/task.selector';
import { Task, TypePriority } from 'src/app/shared/models/task.model';
import { Sort } from '@angular/material/sort';
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

  tasks!: Task[];

  sortedData!: Task[];

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllTask());
    this.tasks$.subscribe((tasks) => {
      this.dataSource.data = tasks;
      this.tasks = tasks;
      this.sortedData = tasks.slice();
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

  sortData(sort: Sort) {
    const data = this.tasks.slice();
    const isAsc = sort.direction === 'asc';
    this.sortedData = data.sort((a, b) => {
      switch(sort.active) {
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'deadline':
          return this.compareDate(a.deadline, b.deadline, isAsc);
        default:
          return 0;
      }
    })

    this.dataSource.data = this.sortedData;
  }

  compare(a: boolean | TypePriority, b: boolean | TypePriority, isAsc: boolean) {
    return ((a === b)? 0 : a? -1 : 1) * (isAsc ? 1 : -1);;
  }

  compareDate(a: number | null, b: number | null, isAsc: boolean) {
    const distantPast = new Date(0)
    let dateA = a ? new Date(a) : distantPast;
    let dateB = b ? new Date(b) : distantPast;
    return (dateA.valueOf() - dateB.valueOf()) * (isAsc ? 1 : -1);
  }
}
