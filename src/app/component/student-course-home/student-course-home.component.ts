import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-course-home',
  templateUrl: './student-course-home.component.html',
  styleUrls: ['./student-course-home.component.css']
})
export class StudentCourseHomeComponent implements OnInit {

  constructor(public oktaAuth: OktaAuthService,public router: Router) { }

  ngOnInit(): void {
  }
  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }

}
