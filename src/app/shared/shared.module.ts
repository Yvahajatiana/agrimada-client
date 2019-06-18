import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { MsgIconBtnComponent } from './components/msgiconbtn/msgiconbtn.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SettingsService } from './services/settings.service';

const modules = [
  HttpClientModule,
  ReactiveFormsModule,
  MaterialModule,
  RouterModule
];

@NgModule({
  declarations: [
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    MsgIconBtnComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [CommonModule, ...modules],
  exports: [
    ...modules,
    PageNotFoundComponent,
    HeaderComponent,
    MsgIconBtnComponent,
    NavbarComponent,
    SidebarComponent
  ],
  providers: [SettingsService]
})
export class SharedModule {}
