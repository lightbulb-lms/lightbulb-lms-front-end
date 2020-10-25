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
    HeaderComponent
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
