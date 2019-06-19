import { FormBuilder, FormGroup } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';

export class BaseForm<T> {
  @Input() value: T;
  @Output() valueChange = new EventEmitter<T>();
  private __errors: any;
  @Input() set errors(value: any) {
    this.__errors = value;
    this.updateErrors();
  }
  get errors(): any {
    return this.__errors;
  }
  @Output() errorsChange = new EventEmitter<any>();
  formGroup: FormGroup;
  protected genericErrorMessages = {
    required: 'This field is required'
  };

  constructor() {}

  submit(): void {
    if (this.formGroup.valid) {
      this.value = this.formGroup.value;
      this.valueChange.emit(this.value);
    }
  }

  updateErrors() {
    if (this.formGroup === undefined) {
      return;
    }
    this.formGroup.setErrors({});
    for (const key in this.errors) {
      if (this.errors.hasOwnProperty(key)) {
        const value: string[] = this.errors[key];
        this.formGroup.controls[key].setErrors({
          custom: value[0]
        });
      }
    }
  }

  hasError(controlName: string, validationKkey: string): boolean {
    if (!this.formGroup) {
      return false;
    }
    const control = this.formGroup.controls[controlName];
    return control.hasError(validationKkey);
  }

  getError(controlName: string, validationKkey: string): string {
    if (!this.formGroup || !this.hasError(controlName, validationKkey)) {
      return null;
    }
    const control = this.formGroup.controls[controlName];
    return this.genericErrorMessages.hasOwnProperty(validationKkey)
      ? this.genericErrorMessages[validationKkey]
      : control.getError(validationKkey);
  }
}
