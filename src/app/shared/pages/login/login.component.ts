import { Component, OnInit } from '@angular/core';
import { LoginService, Credential } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  wrongCredential = false;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginFormGroup = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (
      localStorage.getItem('access_token') !== undefined &&
      localStorage.getItem('access_token') !== null
    ) {
      console.log(localStorage.getItem('access_token'));
      this.router.navigate(['/dashboard/categories']);
    }
  }

  loginBtn(credential: Credential) {
    console.log(credential);
    this.loginService.login(credential).subscribe(response => {
      if (
        response.access_token !== undefined &&
        response.refresh_token !== undefined
      ) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.access_token);

        this.router.navigate(['/dashboard/categories']);
      } else {
        this.wrongCredential = true;
      }
    });
  }
}
