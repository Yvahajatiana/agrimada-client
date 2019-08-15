import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from './create.category.component';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  };
  categories: MatTableDataSource<any>;
  formGroup: FormGroup;
  selected: any;
  addUpdateErrors: any;
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['CategoryName', 'Descriptions', 'Actions'];

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.formGroup = this.fb.group({
      categoryName: ['', Validators.required],
      descriptions: ['', Validators.required],
      picture: ['']
    });
  }

  ngOnInit() {
    // this.categories = this.initCategories();
    this.refreshCategories();
  }

  openForm(): void {
    this.selected = undefined;
    this.formGroup.setValue({
      categoryName: '',
      descriptions: '',
      picture: ''
    });
    document.getElementById('edit-btn').click();
  }

  closeForm(): void {
    document.getElementById('modal-close').click();
  }

  openEditForm(selectedCategory: Category): void {}

  onDelete(selectedCategory: Category): void {}

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.get('picture').setValue(file);
    }
  }

  onSave(category) {
    console.log(this.selected);
    const formData = new FormData();
    formData.append('CategoryName', category.categoryName);
    formData.append('Descriptions', category.descriptions);
    if (category.picture instanceof File) {
      formData.append('Picture', category.picture);
    }

    if (this.selected !== undefined) {
      formData.append('CategoryID', this.selected.CategoryID);
      formData.append('_method', 'put');
      this.onUpdate(formData, this.selected.CategoryID);
    } else {
      this.onCreate(formData);
    }
  }

  onCreate(category) {
    this.httpClient
      .post<Category>('/api/bo/categories', category, {
        headers: this.headers
      })
      .subscribe(response => {
        this.refreshCategories();
        this.closeForm();
      });
  }

  refreshCategories() {
    this.isLoading = true;
    this.httpClient
      .get<any[]>('/api/bo/categories', { headers: this.headers })
      .subscribe(response => {
        this.categories = new MatTableDataSource<Category>(response);
        console.log(this.categories);
        this.isLoading = false;
        this.categories.paginator = this.paginator;
      });
  }

  deleteCategory(id: number) {
    this.httpClient
      .delete(`/api/bo/categories/${id}`, { headers: this.headers })
      .subscribe(response => {
        console.log(response);
        this.refreshCategories();
      });
  }

  editCategory(id: number) {
    this.selected = this.categories.data.find(x => x.CategoryID === id);
    console.log(this.selected);
    this.formGroup.setValue({
      categoryName: this.selected.CategoryName,
      descriptions: this.selected.Descriptions,
      picture: this.selected.Picture
    });
    document.getElementById('edit-btn').click();
  }

  onUpdate(category, id) {
    this.httpClient
      .post(`/api/bo/categories/${id}`, category, { headers: this.headers })
      .subscribe(response => {
        console.log(response);
        this.refreshCategories();
        this.closeForm();
      });
  }
}
