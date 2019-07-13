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
import { JwtModule } from '@auth0/angular-jwt';
import { DialogboxComponent } from './components/dialogbox/dialogbox.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const modules = [
  HttpClientModule,
  ReactiveFormsModule,
  MaterialModule,
  RouterModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    MsgIconBtnComponent,
    NavbarComponent,
    SidebarComponent,
    DialogboxComponent
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
  entryComponents: [DialogboxComponent],
  providers: [SettingsService]
})
export class SharedModule {}
