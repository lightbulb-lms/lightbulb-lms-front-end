import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
// import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-teacher-home-page',
  templateUrl: './teacher-home-page.component.html',
  styleUrls: ['./teacher-home-page.component.css']
})
export class TeacherHomePageComponent implements OnInit {

  isAuthenticated: boolean;
  user: string;
  listOfAssignedCourses: string;
  // courseId: number;

  constructor(public oktaAuth: OktaAuthService, public router: Router,private http: HttpClient) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );

    // this.oktaAuth.getUser().then(claims => {
    //   if (claims.isAdmin) {
    //     this.isAdmin = true;
    //   } else if (claims.isStudent) {
    //     this.isStudent = true;
    //   } else if (claims.isTeacher) {
    //     this.isTeacher = true;
    //   }
    // });

    oktaAuth.getUser().then(
      claims => {
       this.user = claims.name;
      }
    );

  }

  async ngOnInit(): Promise<void> {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.http.get(environment.hostURL + '/assigned-courses')
      .subscribe(data => this.listOfAssignedCourses = data['courses']);
      this.http.get(environment.hostURL + '/assigned-courses')
      .subscribe(data => console.log(JSON.stringify(data)));
  }



  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }
  navigateToCourse(id) {
    // this.courseId = id;
    // this.navCtrl.navigate('/teacher-course', {id:id});
   }

}
