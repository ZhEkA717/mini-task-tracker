import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then((mainPage) => mainPage.default),
    title: 'Task Tracker | Main',
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/tasks.module').then((tasksPage) => tasksPage.default),
    title: 'Task Tracker | Tasks',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule { }
