import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Product } from './product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    'name',
    'description',
    'quantity',
    'category',
    'harvestDate'
  ];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
      harvestDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openCreateForm() {
    document.getElementById('edit-btn').click();
  }

  onSave(newProduct: Product) {
    console.log(newProduct);
    this.httpClient
      .post('/api/products', newProduct, { headers: this.headers })
      .subscribe(response => {
        console.log(response);
      });
  }
}

export const ELEMENT_DATA: Product[] = [
  {
    id: 1,
    name: 'Product AName',
    description: 'Product desc',
    quantity: 10,
    category: 'Category',
    harvestDate: '22/12/2019'
  },
  {
    id: 2,
    name: 'Product BName',
    description: 'Product desc',
    quantity: 18,
    category: 'Category',
    harvestDate: '22/12/2019'
  },
  {
    id: 3,
    name: 'Product CName',
    description: 'Product desc',
    quantity: 0,
    category: 'Category',
    harvestDate: '22/12/2019'
  },
  {
    id: 4,
    name: 'Product DName',
    description: 'Product desc',
    quantity: 120,
    category: 'Category',
    harvestDate: '22/12/2019'
  },
  {
    id: 5,
    name: 'Product EName',
    description: 'Product desc',
    quantity: 130,
    category: 'Category',
    harvestDate: '22/12/2019'
  },
  {
    id: 6,
    name: 'Product FName',
    description: 'Product desc',
    quantity: 17,
    category: 'Category',
    harvestDate: '22/12/2019'
  },
  {
    id: 7,
    name: 'Product GName',
    description: 'Product desc',
    quantity: 1,
    category: 'Category',
    harvestDate: '22/12/2019'
  }
];
