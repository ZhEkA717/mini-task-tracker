import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import environment from '../../../environments/environment.development';

@Injectable()
export default class HttpApiInterceptor implements HttpInterceptor {
  // eslint-disable-next-line class-methods-use-this
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cloned = req.clone({
      url: environment.apiUrl + req.url,
    });
    return next.handle(cloned);
  }
}
