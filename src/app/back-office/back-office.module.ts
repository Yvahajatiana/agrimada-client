import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeComponent } from './back-office.component';
import { CategoryComponent } from './pages/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { BackOfficeRoutingModule } from './back-office.routing';
import { ProfileComponent } from './pages/profile/profile.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './pages/product/product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SupplierComponent } from './pages/supplier/supplier.component';

@NgModule({
  declarations: [
    BackOfficeComponent,
    CategoryComponent,
    ProfileComponent,
    ProductComponent,
    DashboardComponent,
    SupplierComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    BackOfficeRoutingModule,
    MaterialModule
  ]
})
export class BackOfficeModule {}
