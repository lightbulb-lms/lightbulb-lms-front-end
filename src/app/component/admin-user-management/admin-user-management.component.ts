import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {OktaAuthService} from '@okta/okta-angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {
  listNumber: number;
  listOfTeachers: string;
  listOfStudents: string;
  user: string;

  constructor(private http: HttpClient, private oktaAuth: OktaAuthService, public router: Router) {
    this.listNumber = 0;
    oktaAuth.getUser().then(
      claims => {
       this.user = claims.name;
      }
    );
   }

  ngOnInit(): void {
    this.http.get(environment.hostURL + '/users')
      .subscribe(data =>{
        this.listOfTeachers = data['teacherUsers'];
        this.listOfStudents = data['studentUsers'];
        
      }  );
  }
  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }
  onClickTeachers(): void {
    this.listNumber = 2;
  }

  onClickStudents(): void {
    this.listNumber = 3;
  }

  

}
