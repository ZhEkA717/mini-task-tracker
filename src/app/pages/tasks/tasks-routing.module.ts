import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import TaskItemsComponent from './component/task-items/task-items.component';

const routes: Routes = [{
  path: '', component: TaskItemsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class TasksRoutingModule { }
