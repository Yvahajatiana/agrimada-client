import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './forms/category-form/category-form.component';
import { BackOfficeComponent } from './pages/back-office/back-office.component';
import { CategoryComponent } from './pages/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { BackOfficeRoutingModule } from './back-office.routing';

@NgModule({
  declarations: [CategoryFormComponent, BackOfficeComponent, CategoryComponent],
  imports: [CommonModule, SharedModule, BackOfficeRoutingModule]
})
export class BackOfficeModule {}
