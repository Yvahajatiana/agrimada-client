import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class MaterialModule {}
