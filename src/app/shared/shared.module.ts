import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LaravelInterceptor } from './interceptors/laravel.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FigurecardComponent } from './components/figurecard/figurecard.component';
import { AuthService } from './services/auth.service';

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
    DialogboxComponent,
    FigurecardComponent
  ],
  imports: [CommonModule, ...modules],
  exports: [
    ...modules,
    PageNotFoundComponent,
    HeaderComponent,
    MsgIconBtnComponent,
    NavbarComponent,
    SidebarComponent,
    FigurecardComponent
  ],
  entryComponents: [DialogboxComponent],
  providers: [
    AuthService,
    SettingsService,
    { provide: HTTP_INTERCEPTORS, useClass: LaravelInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class SharedModule {}
