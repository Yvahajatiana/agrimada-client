import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Product } from './product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  formGroup: FormGroup;
  displayedColumns: string[] = [
    'ProductName',
    'ProductDescriptions',
    'Quantity',
    'CategoryID',
    'Harvest_Month',
    'Actions'
  ];
  products: MatTableDataSource<Product>;
  isLoading = false;
  selected: Product;
  categories: Category[];
  monthList = [
    'January',
    'February',
    'Mars',
    'April',
    'June',
    'Jully',
    'Aougust',
    'September',
    'October',
    'November',
    'December'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.formGroup = this.fb.group({
      ProductName: ['', Validators.required],
      ProductDescriptions: ['', Validators.required],
      Quantity: ['', Validators.required],
      CategoryID: ['-100', Validators.required],
      Harvest_Month: ['', Validators.required],
      Pictures: ['']
    });
  }

  ngOnInit() {
    this.initCategories();
    this.refreshProducts();
  }

  openForm() {
    this.selected = undefined;
    this.formGroup.setValue({
      ProductName: '',
      ProductDescriptions: '',
      Quantity: '',
      CategoryID: '',
      Harvest_Month: '',
      Pictures: ''
    });
    document.getElementById('edit-btn').click();
  }

  editProduct(id) {
    this.selected = this.products.data.find(x => x.ProductID === id);
    this.formGroup.setValue({
      ProductName:
        this.selected.ProductName !== undefined
          ? this.selected.ProductName
          : '',
      ProductDescriptions:
        this.selected.ProductDescriptions !== undefined
          ? this.selected.ProductDescriptions
          : '',
      Quantity:
        this.selected.Quantity !== undefined ? this.selected.Quantity : '',
      CategoryID:
        this.selected.CategoryID !== undefined ? this.selected.CategoryID : '',
      Harvest_Month:
        this.selected.Harvest_Month !== undefined
          ? this.selected.Harvest_Month
          : '',
      Pictures: ''
    });
    document.getElementById('edit-btn').click();
  }

  getCategoryName(id) {
    const selectedCategory = this.categories.find(x => x.CategoryID === id);
    return selectedCategory.CategoryName;
  }

  getParentCategoryName(id) {
    const selectedCategory = this.categories.find(x => x.CategoryID === id);
    if (selectedCategory === undefined) {
      return '';
    }
    const parent = this.categories.find(
      x => x.ParentID === selectedCategory.ParentID
    );
    return parent.CategoryName;
  }
  initCategories() {
    this.startLoading();
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
      this.endLoading();
    });
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(response => {
      this.refreshProducts();
    });
  }

  onSave(product: Product) {
    if (this.selected === undefined) {
      this.productService.createProduct(product).subscribe(response => {
        this.closeFormAndRefresh();
        this.endLoading();
      });
    } else {
      this.productService
        .updateProduct(product, this.selected.ProductID)
        .subscribe(response => {
          this.closeFormAndRefresh();
          this.endLoading();
        });
    }
  }

  refreshProducts() {
    this.startLoading();
    this.productService.getProducts().subscribe(response => {
      this.products = new MatTableDataSource<Product>(response);
      this.products.paginator = this.paginator;
      this.endLoading();
    });
  }

  closeFormAndRefresh() {
    this.refreshProducts();
    this.closeForm();
  }
  closeForm(): void {
    document.getElementById('modal-close').click();
  }

  startLoading() {
    this.isLoading = true;
  }

  endLoading() {
    this.isLoading = false;
  }

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();
  }
}
