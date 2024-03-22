import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import HeaderComponent from './components/header/header.component';
import SharedModule from '../shared/shared.module';
import SidenavComponent from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
  ],
})
export default class CoreModule { }
