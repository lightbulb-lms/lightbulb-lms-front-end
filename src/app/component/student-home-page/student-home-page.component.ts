import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent implements OnInit {

  listOfAssignedCourses:string;
  // isAuthenticated: boolean;
  user:string;

  constructor(public oktaAuth: OktaAuthService, public router: Router, private http: HttpClient) { 
   


    oktaAuth.getUser().then(
      claims => {
       this.user = claims.name;
      }
    );
  }

   ngOnInit(): void {
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.http.get(environment.hostURL + '/assigned-courses')
      .subscribe(data => this.listOfAssignedCourses = data['courses']);
      this.http.get(environment.hostURL + '/assigned-courses')
      .subscribe(data => this.listOfAssignedCourses = data['courses']);
  }
  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }

}
