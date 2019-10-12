import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: MatTableDataSource<any>;
  parents: any[];
  formGroup: FormGroup;
  selected: any;
  addUpdateErrors: any;
  isLoading = false;
  lastFile: File;
  isSubCategory = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'CategoryName',
    'Descriptions',
    'Slug',
    'Actions'
  ];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      CategoryName: ['', Validators.required],
      Descriptions: ['', Validators.required],
      ParentID: [''],
      Picture: ['']
    });
    console.log(this.router.url);
    this.isSubCategory = this.router.url.includes('/bo/dashboard/products');
  }

  ngOnInit() {
    this.refreshCategories();
  }

  openForm(): void {
    this.selected = undefined;
    this.formGroup.setValue({
      CategoryName: '',
      Descriptions: '',
      ParentID: '',
      Picture: ''
    });
    document.getElementById('edit-btn').click();
  }

  closeForm(): void {
    document.getElementById('modal-close').click();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.formGroup.get('Picture').setValue(file);
      this.lastFile = file;
    }
  }

  onSave(category: Category) {
    this.startLoading();
    if (this.selected === undefined) {
      this.categoryService.createCategory(category).subscribe(response => {
        this.afterSaveUpdate();
        this.stopLoading();
      });
    } else {
      this.categoryService
        .updateCategory(category, this.selected.CategoryID)
        .subscribe(response => {
          this.afterSaveUpdate();
          this.stopLoading();
        });
    }
  }

  afterSaveUpdate() {
    this.refreshCategories();
    this.closeForm();
  }

  refreshCategories() {
    this.startLoading();
    this.categoryService.getCategories().subscribe(response => {
      this.initTable(response);
      this.stopLoading();
    });
  }

  initTable(data: Category[]) {
    const filtredData = this.isSubCategory
      ? data.filter(x => x.ParentID !== null)
      : data.filter(x => x.ParentID === null);
    this.categories = new MatTableDataSource<Category>(filtredData);
    this.parents = this.categories.data.filter(x => x.ParentID === null);
    this.categories.paginator = this.paginator;
  }

  deleteCategory(id: number) {
    this.startLoading();
    this.categoryService.deleteCategory(id).subscribe(response => {
      this.refreshCategories();
      this.stopLoading();
    });
  }

  editCategory(id: number) {
    this.selected = this.categories.data.find(x => x.CategoryID === id);
    this.formGroup.setValue({
      CategoryName: this.selected.CategoryName,
      Descriptions: this.selected.Descriptions,
      Picture: this.selected.Picture,
      ParentID:
        this.selected.ParentID === undefined ? '' : this.selected.ParentID
    });
    document.getElementById('edit-btn').click();
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }

  applyFilter(filterValue: string) {
    this.categories.filter = filterValue.trim().toLowerCase();
  }
}
