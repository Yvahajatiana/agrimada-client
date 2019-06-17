import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeComponent } from './back-office.component';
import { CategoryComponent } from './pages/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { BackOfficeRoutingModule } from './back-office.routing';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateCategoryComponent } from './pages/category/create.category.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsService } from './services/settings.service';
import { MaterialModule } from '../material/material.module';
import { MsgIconBtnComponent } from './components/msgiconbtn/msgiconbtn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BackOfficeComponent,
    CategoryComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    CreateCategoryComponent,
    ProfileComponent,
    MsgIconBtnComponent
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
  entryComponents: [CreateCategoryComponent],
  providers: [SettingsService]
})
export class BackOfficeModule {}
