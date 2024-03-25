import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import HeaderComponent from './components/header/header.component';
import SharedModule from '../shared/shared.module';
import SidenavComponent from './components/sidenav/sidenav.component';
import HttpApiInterceptor from './services/http-api.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true,
    },
  ],
})
export default class CoreModule { }
