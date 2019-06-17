import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject, Component, OnInit } from '@angular/core';
import { ICategory } from './category.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-create-category',
    templateUrl: 'create.category.component.html',
  })
  export class CreateCategoryComponent implements OnInit {
    formGroup: FormGroup;
    constructor(private fb: FormBuilder,
      public dialogRef: MatDialogRef<CreateCategoryComponent>,
      @Inject(MAT_DIALOG_DATA) public category: ICategory) {
      this.formGroup = this.fb.group({
        title: [this.category.title, Validators.required],
        description: [this.category.description, Validators.required]
      });
    }
    ngOnInit(): void {

    }
    onSave(data: ICategory) {
      data.supplierCount = 0;
      this.dialogRef.close(data);
      console.log(data);
    }
  }