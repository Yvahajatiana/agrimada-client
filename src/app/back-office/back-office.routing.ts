import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BackOfficeComponent } from './back-office.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductComponent } from './pages/product/product.component';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const BackOfficeRoutes: Routes = [
  {
    path: '',
    component: BackOfficeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'products', component: ProductComponent },
      { path: 'dictionaries', component: DictionaryComponent },
      { path: 'menus', component: MenuComponent }
    ]
  }
];
export const BackOfficeRoutingModule: ModuleWithProviders = RouterModule.forChild(
  BackOfficeRoutes
);
