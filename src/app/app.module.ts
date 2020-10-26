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
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { StudentHomePageComponent } from './component/student-home-page/student-home-page.component';
import { TeacherHomePageComponent } from './component/teacher-home-page/teacher-home-page.component';
import { NavigationComponent } from './component/navigation/navigation.component';

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
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StudentHomePageComponent,
    TeacherHomePageComponent,
    NavigationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    OktaAuthModule
  ],
  providers: [
    {provide: OKTA_CONFIG, useValue: config},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
