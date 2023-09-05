import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { LightInfoComponent } from './components/light-info/light-info.component';
import { MyTransactionsComponent } from './pages/my-transactions/my-transactions.component';
import { MyContactListComponent } from './pages/my-contact-list/my-contact-list.component';
import { NewTransactionComponent } from './pages/new-transaction/new-transaction.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainAdminPageComponent } from './admin/main-admin-page/main-admin-page.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { AuthenticationService } from './services/services';
import { ConfirmRegisterComponent } from './pages/confirm-register/confirm-register.component';
import { TokenGuardService } from './services/guard/token-guard/token-guard.service';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AdminGuardService } from './services/guard/admin-guard/admin-guard.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HelperService } from './services/helper/helper.service';
import { NgChartsModule } from 'ng2-charts';

import { DatePipe, JsonPipe, NgIf } from '@angular/common';
import { DpDatePickerModule } from 'ng2-date-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    UserDashboardComponent,
    LightInfoComponent,
    MyTransactionsComponent,
    MyContactListComponent,
    NewTransactionComponent,
    NewContactComponent,
    ProfileComponent,
    ManageUsersComponent,
    MainPageComponent,
    MainAdminPageComponent,
    AdminDashboardComponent,
    ConfirmRegisterComponent,
    AccessDeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    DpDatePickerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatInputModule
    //MatCardModule


  ],
 // schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    HttpClient,
    AuthenticationService,
    HttpInterceptorService,
    TokenGuardService,
    AdminGuardService,
    JwtHelperService,
    HelperService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
