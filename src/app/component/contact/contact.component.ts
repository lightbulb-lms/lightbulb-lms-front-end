import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService, public router: Router) { }

  async ngOnInit(): Promise<void> {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login(): void {
    this.oktaAuth.loginRedirect('/profiles');
    
  }

  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }


}
