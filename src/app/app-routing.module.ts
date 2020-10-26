import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {LoginComponent} from './component/login/login.component';
import {ProtectedComponent} from './component/protected/protected.component';
import {HomeComponent} from './component/home/home.component';


const routes: Routes = [
  {
    // path: 'login/callback',
    // component: OktaCallbackComponent
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [OktaAuthGuard],
    data: {
      onAuthRequired
    }
  }
];

export function onAuthRequired(oktaAuth, injector): void {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
