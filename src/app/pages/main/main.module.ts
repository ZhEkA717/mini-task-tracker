import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import SharedModule from 'src/app/shared/shared.module';
import MainRoutingModule from './main-routing.module';
import MainComponent from './component/main/main.component';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ],
})
export default class MainModule { }
