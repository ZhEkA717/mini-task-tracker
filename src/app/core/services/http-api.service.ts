import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_TASKS } from 'src/app/shared/env.constants';
import { CreateTaskDto, Task, UpdateTaskDto } from 'src/app/shared/models/task.model';

@Injectable({
  providedIn: 'root',
})

export default class HttpApiService {
  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(URL_TASKS);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${URL_TASKS}/${id}`);
  }

  createTask(createTaskDto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(URL_TASKS, createTaskDto);
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Observable<Task> {
    return this.http.put<Task>(`${URL_TASKS}/${id}`, updateTaskDto);
  }

  updateAllTasks(dto: Task[]): Observable<Task[]> {
    return this.http.put<Task[]>(URL_TASKS, dto);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${URL_TASKS}/${id}`);
  }
}
