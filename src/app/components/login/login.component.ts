import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]

    })
  }

  ngOnInit(): void {
  }

  login() {

    const loginCredintails = this.loginForm.value;
    const loginFormData = new FormData();
    loginFormData.append('username', loginCredintails.username);
    loginFormData.append('password', loginCredintails.password);

    this.authService.login(loginFormData).subscribe(res => {
      this.resetForm();
      this.router.navigate(['']);
    });
  }

  resetForm() {
    this.loginForm.reset();
  }

}
