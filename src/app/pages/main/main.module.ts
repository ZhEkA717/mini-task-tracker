import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import SharedModule from 'src/app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import MainRoutingModule from './main-routing.module';
import MainComponent from './main.component';
import TaskComponent from './components/task/task.component';
import AddTaskComponent from './components/add-task/add-task.component';

@NgModule({
  declarations: [
    MainComponent,
    TaskComponent,
    AddTaskComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [MatDatepickerModule],
})
export default class MainModule { }
