import { Component, OnInit, ViewChild } from '@angular/core';
import { Supplier } from './supplier.model';
import { SupplierService } from './supplier.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  suppliers: MatTableDataSource<Supplier>;
  displayedColumns: string[] = [
    'company_name',
    'company_descriptions',
    'email',
    'phone'
  ];
  isLoading = true;
  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
    this.refreshData();
  }
  refreshData() {
    this.startLoading();
    this.supplierService.getSuppliers().subscribe(response => {
      this.suppliers = new MatTableDataSource<Supplier>(response);
      this.suppliers.paginator = this.paginator;
      this.stopLoading();
    });
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }

  applyFilter(filterValue: string) {
    this.suppliers.filter = filterValue.trim().toLowerCase();
  }
}
