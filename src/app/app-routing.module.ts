import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {LoginComponent} from './component/login/login.component';
import {ProtectedComponent} from './component/protected/protected.component';
import {HomeComponent} from './component/home/home.component';
import {StudentHomePageComponent} from "./component/student-home-page/student-home-page.component";
import {TeacherHomePageComponent} from "./component/teacher-home-page/teacher-home-page.component";
import {AdministratorHomePageComponent} from "./component/administrator-home-page/administrator-home-page.component";
import {StudentCourseHomeComponent} from "./component/student-course-home/student-course-home.component";
import { TeacherCoursePageComponent } from './component/teacher-course-page/teacher-course-page.component';
import { AdminCourseManagementComponent } from './component/admin-course-management/admin-course-management.component';
import { AdminUserManagementComponent } from './component/admin-user-management/admin-user-management.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';


const routes: Routes = [
  {
    path: 'login/callback',
    component: OktaCallbackComponent
  },
  {
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
  },
  {
    path: 'student-login',
    canActivate: [OktaAuthGuard],
    component: StudentHomePageComponent
  },
  {
    path: 'teacher-login',
    canActivate: [OktaAuthGuard],
    component: TeacherHomePageComponent
  },
  {
    path: 'admin-login',
    canActivate: [OktaAuthGuard],
    component: AdministratorHomePageComponent
  },
  {
    path: 'student-course-home/:id/:user',
    canActivate: [OktaAuthGuard],
    component: StudentCourseHomeComponent
  },
  {
    path: 'teacher-course/:id/:user',
    canActivate: [OktaAuthGuard],
    component: TeacherCoursePageComponent
  },
  {
    path: 'admin-course-management/:user',
    canActivate:[OktaAuthGuard],
    component: AdminCourseManagementComponent
  },
  {
    path:'admin-user-management/:user',
    canActivate:[OktaAuthGuard],
    component:AdminUserManagementComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'contact',
    component:ContactComponent
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
export class AppRoutingModule {
}
