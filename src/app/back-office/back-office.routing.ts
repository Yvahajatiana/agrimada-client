import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BackOfficeComponent } from './pages/back-office/back-office.component';
import { CategoryComponent } from './pages/category/category.component';

const BackOfficeRoutes: Routes = [
  {
    path: '',
    component: BackOfficeComponent,
    children: [
      { path: 'categories', component: CategoryComponent }
    ]
  }
];
export const BackOfficeRoutingModule: ModuleWithProviders = RouterModule.forChild(
  BackOfficeRoutes
);
