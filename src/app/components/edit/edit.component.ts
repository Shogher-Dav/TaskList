import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  updateTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.updateTaskForm = this.fb.group({
      text: [null, Validators.required],
      status: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  updateTask() {

    const urlArr = this.router.url.split('/');
    const id = urlArr[urlArr.length - 1];
    const updateFormData = this.createFormDataForUpdate();
    this.taskService.editTask(updateFormData, id).subscribe(() => {
      this.resetForm();
    })

  }

  createFormDataForUpdate(): FormData {
    const updateTask = this.updateTaskForm.value;
    const updateTaskForm = new FormData();

    updateTaskForm.append("text", updateTask.text);
    updateTaskForm.append("status", updateTask.status);
    return updateTaskForm;

  }

  resetForm() {
    this.updateTaskForm.reset();
  }

}
