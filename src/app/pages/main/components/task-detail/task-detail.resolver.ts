import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { EMPTY, Observable, catchError, map } from "rxjs";
import HttpApiService from "src/app/core/services/http-api.service";
import { saveTask } from "src/app/redux/actions/task.action";
import { Task } from "src/app/shared/models/task.model";

@Injectable({
  providedIn: 'root',
})
export default class TaskDetailResolver implements Resolve<Task> {
  constructor(
    private store: Store,
    private router: Router,
    private httpApiService: HttpApiService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Task> {
    return this.httpApiService.getTask(route.params?.['id'])
      .pipe(
        catchError(() => {
          this.router.navigate(['']);
          return EMPTY;
        }),
        map((task:  Task) => {
          this.store.dispatch(saveTask({task}));
          return task;
        })
      )
  }
}
