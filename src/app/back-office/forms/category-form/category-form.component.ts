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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      CategoryID: [this.value.CategoryID],
      CategoryName: [this.value.CategoryName, Validators.required, Validators.pattern(/\w+/i)],
      Descriptions: [this.value.Descriptions, Validators.required],
      Picture: [this.value.Picture, Validators.required],
    });
  }

}
