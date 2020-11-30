import {Component} from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-secure',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {
  message: string;

  constructor(oktaAuthService: OktaAuthService) {
    oktaAuthService.getUser().then(
      claims => {
        if (claims.isAdmin) {
          this.message = 'You are an admin!';
        } else if (claims.isStudent) {
          this.message = 'You are a student!';
        } else if (claims.isTeacher) {
          this.message = 'You are a teacher!';
        };
       }
    );
    
  }
}
