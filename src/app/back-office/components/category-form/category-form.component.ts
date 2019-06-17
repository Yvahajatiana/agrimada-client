import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() value: Category;
  @Output() valueChange = new EventEmitter<Category>();
  @Input() errors: any[];

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      CategoryID: [this.value ? this.value.CategoryID : null],
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

  submit() {
    if (this.formGroup.valid) {
      this.valueChange.emit(this.formGroup.value);
    } else {
    }
  }
}
