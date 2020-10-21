import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

import {OktaAuthService} from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-secure',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  oktaAuthService;
  widget = new OktaSignIn({
    baseUrl: 'https://dev-241119.okta.com',
    authParams: {
      pkce: true
    }
  });

  constructor(oktaAuth: OktaAuthService, router: Router) {
    this.oktaAuthService = oktaAuth;

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.widget.renderEl({
        el: '#okta-signin-container'
      },
      (res) => {
        if (res.status === 'SUCCESS') {
          this.oktaAuthService.loginRedirect('/', {sessionToken: res.session.token});
          // Hide the widget
          this.widget.hide();
        }
      },
      (err) => {
        throw err;
      }
    );
  }
}
