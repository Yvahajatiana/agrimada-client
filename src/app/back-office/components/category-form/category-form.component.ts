import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from '../../models/base-form';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseForm<Category>
  implements OnInit {
  private file: File;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      CategoryID: [this.value ? this.value.CategoryID : 0],
      CategoryName: [
        this.value ? this.value.CategoryName : null,
        Validators.required
      ],
      Descriptions: [
        this.value ? this.value.Descriptions : null,
        Validators.required
      ],
      Picture: [this.value ? this.value.Picture : null, Validators.required]
    });
  }

  submit(): void {
    if (this.formGroup.valid) {
      this.value = this.formGroup.value;
      this.value.Picture = this.file;
      this.valueChange.emit(this.value);
    }
  }

  pictureChange(value: HTMLInputElement): void {
    this.file = value.files[0];
  }
}
