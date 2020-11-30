import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-course-home',
  templateUrl: './student-course-home.component.html',
  styleUrls: ['./student-course-home.component.css']
})
export class StudentCourseHomeComponent implements OnInit {
  courseId: string;
  user:string;
  listOfContents:string;

  constructor(public oktaAuth: OktaAuthService,public router: Router,  route: ActivatedRoute, private http: HttpClient) {
    this.courseId = route.snapshot.params['id'];
    this.user = route.snapshot.params['user'];
   }

  ngOnInit(): void {
    this.http.get(environment.hostURL + '/course/'+this.courseId+'/content')
    .subscribe(data => this.listOfContents = data['content']);
  }
  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }

}
