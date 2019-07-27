import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject, Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: 'create.category.component.html'
})
export class CreateCategoryComponent implements OnInit {
  formGroup: FormGroup;
  file: File;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ) {
    this.formGroup = this.fb.group({
      title: [this.category.title, Validators.required],
      description: [this.category.description, Validators.required],
      picture: []
    });
  }
  ngOnInit(): void {}
  onSave(data: Category) {
    data.supplierCount = 0;
    this.dialogRef.close(data);
    console.log(data);
  }
  pictureChange(value: HTMLInputElement): void {
    this.file = value.files[0];
  }
}
