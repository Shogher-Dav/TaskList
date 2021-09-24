import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs/operators';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  taskFormGroup: FormGroup;
  isAuth = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {

    this.taskFormGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      text: ['', Validators.required],
    });

  }

  ngOnInit(): void { }

  creatNewTask(): void {

    const taskFormData = this.createFormData();
    this.taskService.createNewTask(taskFormData).pipe(
      delay(500)
    ).subscribe(res => {
      if (res.status = "ok") {
        this.openSnackBar('Your task successfully added')
      } else {
        this.openSnackBar('Something went wrong please try again')
      }
    });
    this.resetForm();
  }

  createFormData(): FormData {
    const task = this.taskFormGroup.value;
    const taskFormData = new FormData();
    taskFormData.append("username", task.username);
    taskFormData.append("email", task.email);
    taskFormData.append("text", task.text);
    return taskFormData;
  }



  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  resetForm() {
    this.taskFormGroup.reset();
  }


}
