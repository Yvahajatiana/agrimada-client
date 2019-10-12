import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BackOfficeComponent } from './back-office.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductComponent } from './pages/product/product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SupplierComponent } from './pages/supplier/supplier.component';

const BackOfficeRoutes: Routes = [
  {
    path: '',
    component: BackOfficeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'products', component: CategoryComponent },
      { path: 'supplier-products', component: ProductComponent },
      { path: 'suppliers', component: SupplierComponent }
    ]
  }
];
export const BackOfficeRoutingModule: ModuleWithProviders = RouterModule.forChild(
  BackOfficeRoutes
);
