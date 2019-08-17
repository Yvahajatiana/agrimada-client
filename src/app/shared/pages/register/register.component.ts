import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService, RegisterModel } from './register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  optin = false;
  isSubmited = false;
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      optinSupplier: [false],
      optin: [false]
    });
  }

  ngOnInit() {
    this.registerForm.valueChanges.subscribe(values => {
      if (values.optin !== undefined) {
        this.optin = values.optin;
      }
    });
  }

  register(registerFormValue: RegisterModel): void {
    this.isSubmited = true;
    registerFormValue.password_confirmation = registerFormValue.password;
    if (this.registerForm.value.optinSupplier) {
      registerFormValue.role = 'supplier';
    } else {
      registerFormValue.role = 'customer';
    }
    const toPost: RegisterModel = {
      name: registerFormValue.name,
      email: registerFormValue.email,
      phone: registerFormValue.phone,
      role: registerFormValue.role,
      password: registerFormValue.password,
      password_confirmation: registerFormValue.password_confirmation
    };

    console.log(toPost);
    this.registerService.register(toPost).subscribe(response => {
      console.log(response);
      if (response !== undefined && response.id !== undefined) {
        this.snackBar.open(
          'registration with success please valid your mail',
          'Yes',
          {
            duration: 3000
          }
        );
        this.router.navigate(['bo/signin']);
      } else {
        this.snackBar.open(
          'Ooops!! registration failed please try again!',
          'Error',
          {
            duration: 3000
          }
        );
      }
    });
  }

  hasError(field: string, errorKey: string = null) {
    const control = this.registerForm.controls[field];
    if (control.errors && (this.isSubmited || control.touched)) {
      if (errorKey) {
        return control.getError(errorKey);
      }
      return true;
    } else {
      return false;
    }
  }
}
