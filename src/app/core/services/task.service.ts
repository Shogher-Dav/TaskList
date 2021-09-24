import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITask } from '../interfaces/ITask';
import { tap } from 'rxjs/operators';
import { IResponse } from '../interfaces/IResponse';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private BASE_URL = environment.BASE_URL;

  private _taskList$: Subject<ITask[]> = new Subject();


  getTaskList(): Observable<ITask[]> {
    return this._taskList$.asObservable();
  }

  setTaskList(taskList: ITask[]) {
    this._taskList$.next(taskList);
  }

  constructor(private httpClient: HttpClient,
    private authService: AuthService) { }

  getFromServerTaskList(page?: number): Observable<IResponse> {
    return this.httpClient.get<any>(`${this.BASE_URL}/`, {
      params: {
        'page': page || 0,
      }
    });
  }

  createNewTask(task: FormData): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/create`, task);
  }

  editTask(changedData: FormData, id: string): Observable<any> {
    const token = this.authService.getTokenLocalStr();
    return this.httpClient.put(`${this.BASE_URL}/edit/${id}`, changedData, {
      params: {
        token: token
      }
    });
  }

  getTask() {
    return this.httpClient.get(`${this.BASE_URL}/27331`);
  }



}
