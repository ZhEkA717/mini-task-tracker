import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import HttpApiService from "src/app/core/services/http-api.service";
import { TaskAction, createTaskError, createTaskSuccess, getAllTaskError, getAllTaskSuccess, getTaskError, getTaskSuccess, updateAllTaskError, updateAllTaskSuccess, updateTaskError, updateTaskSuccess } from "../actions/task.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { CreateTaskDto, Task, UpdateTaskDto } from "src/app/shared/models/task.model";

@Injectable()
export default class TaskEffect {
  public getAllTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskAction.getAllTask),
    mergeMap(() => this.httpApiService
      .getAllTasks()
      .pipe(
        map(
          (items) => getAllTaskSuccess({items, loading: false}),
        ),
      )),
    catchError(() => of(getAllTaskError({loading: false}))),
  ));

  public getTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskAction.getTask),
    mergeMap(({ id }:{ id:string }) => this.httpApiService
      .getTask(id)
      .pipe(
        map(
          (item) => getTaskSuccess({item, loading: false}),
        ),
      )),
    catchError(() => of(getTaskError({loading: false}))),
  ));

  public createTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskAction.createTask),
    mergeMap(({ dto }:{ dto: CreateTaskDto }) => this.httpApiService
      .createTask(dto)
      .pipe(
        map(
          (task) => createTaskSuccess({item: task, loading: false}),
        ),
      )),
    catchError(() => of(createTaskError({loading: false}))),
  ));

  public updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskAction.updateTask),
    mergeMap(({ dto, id }:{ dto: UpdateTaskDto, id: string }) => this.httpApiService
      .updateTask(id, dto)
      .pipe(
        map(
          (task) => updateTaskSuccess({item: task, loading: false}),
        ),
      )),
    catchError(() => of(updateTaskError({loading: false}))),
  ));

  public updateAllTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskAction.updateAllTask),
    mergeMap(({ dto}:{ dto: Task[]}) => this.httpApiService
      .updateAllTasks(dto)
      .pipe(
        map(
          (tasks) => updateAllTaskSuccess({items: tasks, loading: false}),
        ),
      )),
    catchError(() => of(updateAllTaskError({loading: false}))),
  ));

  constructor(
    private actions$: Actions,
    private httpApiService: HttpApiService,
  ){}
}
