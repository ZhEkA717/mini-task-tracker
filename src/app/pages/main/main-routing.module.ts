import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainComponent from './main.component';
import TaskDetailComponent from './components/task-detail/task-detail.component';
import TaskDetailResolver from './components/task-detail/task-detail.resolver';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: ':id',
    component: TaskDetailComponent,
    resolve: {
      task: TaskDetailResolver,
    },
    title: 'Task Tracker | Task',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class MainRoutingModule { }
