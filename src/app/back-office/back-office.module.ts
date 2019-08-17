import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeComponent } from './back-office.component';
import { CategoryComponent } from './pages/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { BackOfficeRoutingModule } from './back-office.routing';
import { CreateCategoryComponent } from './pages/category/create.category.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ProductComponent } from './pages/product/product.component';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { DictionaryFormComponent } from './components/dictionary-form/dictionary-form.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { DictionaryFileFormComponent } from './components/dictionary-file-form/dictionary-file-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    BackOfficeComponent,
    CategoryComponent,
    CreateCategoryComponent,
    ProfileComponent,
    CategoryFormComponent,
    ProductComponent,
    DictionaryComponent,
    DictionaryFormComponent,
    MenuComponent,
    MenuFormComponent,
    DictionaryFileFormComponent,
    DashboardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    BackOfficeRoutingModule,
    MaterialModule
  ],
  entryComponents: [CreateCategoryComponent]
})
export class BackOfficeModule {}
