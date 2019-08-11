import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BackOfficeComponent } from './back-office.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductComponent } from './pages/product/product.component';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';

const BackOfficeRoutes: Routes = [
  {
    path: '',
    component: BackOfficeComponent,
    children: [
      { path: 'categories', component: CategoryComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'products', component: ProductComponent },
      { path: 'dictionaries', component: DictionaryComponent },
    ]
  }
];
export const BackOfficeRoutingModule: ModuleWithProviders = RouterModule.forChild(
  BackOfficeRoutes
);
