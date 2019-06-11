import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const modules = [
  HttpClientModule,
  ReactiveFormsModule,
  MaterialModule,
  RouterModule
];

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, ...modules],
  exports: [...modules, PageNotFoundComponent]
})
export class SharedModule {}
