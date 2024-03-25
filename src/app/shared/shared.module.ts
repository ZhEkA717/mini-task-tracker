/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import TaskDonePipe from './pipes/task-done.pipe';
import { TaskOverduoPipe } from './pipes/task-overdue.pipe';
import { TaskComePipe } from './pipes/task-come.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    TaskDonePipe,
    TaskOverduoPipe,
    TaskComePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    TaskDonePipe,
    TaskOverduoPipe,
    TaskComePipe,
    MatFormFieldModule,
    MatInputModule
  ],
})
export default class SharedModule { }
