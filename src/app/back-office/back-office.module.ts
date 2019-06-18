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

@NgModule({
  declarations: [
    BackOfficeComponent,
    CategoryComponent,
    CreateCategoryComponent,
    ProfileComponent
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
