import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/core/interfaces/ITask';
import { AuthService } from 'src/app/core/services/auth.service';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  taskList$: Observable<ITask[]> = this.taskService.getTaskList();
  taskList: ITask[] = [];
  pageEvent: PageEvent = new PageEvent();
  pageLength: number = 0;
  isAuth: any;
  displayedColumns = ['id', 'userName', 'email', 'text', 'status'];



  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router) {


  }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuthFromLocalStr();
    this.taskService.getFromServerTaskList().subscribe(res => {
      this.taskList = res.message?.tasks;
      this.pageLength = res.message?.total_task_count;
      if(this.isAuth){
        this.displayedColumns.push('edit');
      }

    });
  }

  onPaginateChange(event: PageEvent) {
    const page = event.pageIndex;
    this.taskService.getFromServerTaskList(page).subscribe(res => {
      this.taskList = res.message?.tasks;
    });
  }

  updateTask(id: number) {
    this.router.navigate([`edit/${id}`])

  }


}
