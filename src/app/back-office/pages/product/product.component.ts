import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Product } from './product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  };
  formGroup: FormGroup;
  displayedColumns: string[] = [
    'ProductName',
    'ProductDescriptions',
    'Quantity',
    'CategoryID',
    'Harvest_Month',
    'Actions'
  ];
  dataSource: MatTableDataSource<Product>;
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

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.formGroup = this.fb.group({
      ProductName: ['', Validators.required],
      ProductDescriptions: ['', Validators.required],
      Quantity: ['', Validators.required],
      CategoryID: ['-100', Validators.required],
      Harvest_Month: ['', Validators.required]
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
      Harvest_Month: ''
    });
    document.getElementById('edit-btn').click();
  }

  editProduct(id) {
    this.selected = this.dataSource.data.find(x => x.ProductID === id);
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
          : ''
    });
    console.log(this.formGroup.value);
    document.getElementById('edit-btn').click();
  }

  getCategoryName(id) {
    const selectedCategory = this.categories.find(x => x.CategoryID === id);
    //console.log(selectedCategory);
    return selectedCategory.CategoryName;
  }
  initCategories() {
    this.startLoading();
    this.httpClient
      .get<Category[]>('/api/bo/categories', { headers: this.headers })
      .subscribe(response => {
        this.categories = response;
        console.log(this.categories);
        this.endLoading();
      });
  }

  deleteProduct(id) {}

  onSave(newProduct: Product) {
    console.log(newProduct);
    const formData = new FormData();
    formData.append('ProductName', newProduct.ProductName);
    formData.append('ProductDescriptions', newProduct.ProductDescriptions);
    formData.append('Quantity', String(newProduct.Quantity));
    formData.append('CategoryID', newProduct.CategoryID);
    formData.append('Harvest_Month', newProduct.Harvest_Month);

    if (this.selected === undefined) {
      console.log(this.selected);
      console.log('create');
      this.onCreate(formData);
    } else {
      console.log('edit');
      formData.append('ProductID', String(this.selected.ProductID));
      formData.append('_method', 'put');
      this.onUpdate(formData, this.selected.ProductID);
    }
  }
  onCreate(product: any) {
    this.startLoading();
    this.httpClient
      .post('/api/bo/products', product, { headers: this.headers })
      .subscribe(response => {
        this.closeFormAndRefresh();
        this.endLoading();
      });
  }

  onUpdate(product: any, id: number) {
    this.startLoading();
    this.httpClient
      .post(`/api/bo/products/${id}`, product, { headers: this.headers })
      .subscribe(response => {
        this.closeFormAndRefresh();
        this.endLoading();
      });
  }

  refreshProducts() {
    this.startLoading();
    this.httpClient
      .get<Product[]>('/api/bo/products/my', { headers: this.headers })
      .subscribe(response => {
        this.dataSource = new MatTableDataSource<Product>(response);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
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
}
