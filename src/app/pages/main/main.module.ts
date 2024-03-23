import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import SharedModule from 'src/app/shared/shared.module';
import MainRoutingModule from './main-routing.module';
import MainComponent from './main.component';
import TaskComponent from './components/task/task.component';

@NgModule({
  declarations: [
    MainComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ],
})
export default class MainModule { }
