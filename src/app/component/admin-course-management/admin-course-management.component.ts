import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-course-management',
  templateUrl: './admin-course-management.component.html',
  styleUrls: ['./admin-course-management.component.css']
})
export class AdminCourseManagementComponent implements OnInit {

  constructor(public oktaAuth: OktaAuthService, public router: Router) { }

  ngOnInit(): void {
  }
  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }

}
