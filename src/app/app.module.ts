import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {
  OKTA_CONFIG,
  OktaAuthModule, OktaConfig
} from '@okta/okta-angular';

import {AppComponent} from './app.component';
import {ProtectedComponent} from './component/protected/protected.component';
import {LoginComponent} from './component/login/login.component';
import {AppRoutingModule} from './app-routing.module';

import {HomeComponent} from './component/home/home.component';
import {StudentHomePageComponent} from './component/student-home-page/student-home-page.component';
import {TeacherHomePageComponent} from './component/teacher-home-page/teacher-home-page.component';
import {AdministratorHomePageComponent} from './component/administrator-home-page/administrator-home-page.component';
import {StudentCourseHomeComponent} from './component/student-course-home/student-course-home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Interceptor} from './service/interceptor';
import { TeacherCoursePageComponent } from './component/teacher-course-page/teacher-course-page.component';
import { AdminCourseManagementComponent } from './component/admin-course-management/admin-course-management.component';


// Define config parameters for Okta
const config: OktaConfig = {
  issuer: 'https://dev-241119.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  clientId: '0oabpb05U41ALzccD5d5',
  pkce: true,
  scopes: ['profile']
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProtectedComponent,
    HomeComponent,
    StudentHomePageComponent,
    TeacherHomePageComponent,
    AdministratorHomePageComponent,
    StudentCourseHomeComponent,
    TeacherCoursePageComponent,
    AdminCourseManagementComponent,
    /*
    NavigationComponent
    */
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    OktaAuthModule
  ],
  providers: [
    {provide: OKTA_CONFIG, useValue: config},
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
