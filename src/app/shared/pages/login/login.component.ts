import { Component, OnInit } from '@angular/core';
import { LoginService, Credential } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  constructor(private loginService: LoginService, private fb: FormBuilder) {
    this.loginFormGroup = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  loginBtn(credential: Credential) {
    console.log(credential);
    this.loginService.login(credential);
  }
}
