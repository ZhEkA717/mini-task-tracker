import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import TasksRoutingModule from './tasks-routing.module';
import TaskItemsComponent from './component/task-items/task-items.component';

@NgModule({
  declarations: [
    TaskItemsComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
  ],
})
export default class TasksModule { }
