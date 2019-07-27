import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatMenuTrigger,
  MatMenuModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule,
  MatProgressBarModule,
  MatTabsModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatMenuModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule,
  MatProgressBarModule,
  MatTabsModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class MaterialModule {}
