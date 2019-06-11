import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';

const AppRoutes: Routes = [
  { path: 'bo', loadChildren: './back-office/back-office.module#BackOfficeModule' },
  { path: '**', component: PageNotFoundComponent }
];
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(
  AppRoutes
);
