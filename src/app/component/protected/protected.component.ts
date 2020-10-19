import {Component} from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-secure',
  template: `{{message}}`
})
export class ProtectedComponent {
  message;

  constructor(oktaAuthService: OktaAuthService) {
    oktaAuthService.getUser().then(
      claims => {
        if (claims.isAdmin) {
          this.message = 'You are an admin!';
        } else if (claims.isStudent) {
          this.message = 'You are a student!';
        } else if (claims.isTeacher) {
          this.message = 'You are a teacher!';
        }
      }
    );
  }
}
