import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { RegisterComponent } from './shared/pages/register/register.component';
import { RegisterloginGuardService } from './shared/services/registerlogin-guard.service';

const AppRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './back-office/back-office.module#BackOfficeModule'
  },
  {
    path: 'signin',
    component: LoginComponent,
    canActivate: [RegisterloginGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RegisterloginGuardService]
  },
  { path: '**', component: PageNotFoundComponent }
];
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(
  AppRoutes
);
