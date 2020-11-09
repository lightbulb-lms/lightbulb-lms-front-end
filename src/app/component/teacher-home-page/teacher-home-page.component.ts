import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teacher-home-page',
  templateUrl: './teacher-home-page.component.html',
  styleUrls: ['./teacher-home-page.component.css']
})
export class TeacherHomePageComponent implements OnInit {

  isAuthenticated: boolean;
  isTeacher: boolean;
  isAdmin: boolean;
  isStudent: boolean;

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );

    this.oktaAuth.getUser().then(claims => {
      if (claims.isAdmin) {
        this.isAdmin = true;
      } else if (claims.isStudent) {
        this.isStudent = true;
      } else if (claims.isTeacher) {
        this.isTeacher = true;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login(): void {
    this.oktaAuth.loginRedirect('/profile');
  }

  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }

}
