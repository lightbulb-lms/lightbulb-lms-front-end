import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-teacher-course-page',
  templateUrl: './teacher-course-page.component.html',
  styleUrls: ['./teacher-course-page.component.css']
})
export class TeacherCoursePageComponent implements OnInit {
  action: number;
  listOfContents: string;
  courseId: string;
  user: string;


  constructor(public oktaAuth: OktaAuthService, public router: Router, route: ActivatedRoute, private http: HttpClient) { 
    this.action = 0;
    this.courseId = route.snapshot.params['id'];
    this.user = route.snapshot.params['user'];
    
  }

  ngOnInit(): void {
    this.http.get(environment.hostURL + '/course/'+this.courseId+'/content')
    .subscribe(data => this.listOfContents = data['content']);
    this.http.get(environment.hostURL + '/course/'+this.courseId+'/content')
      .subscribe(data => console.log(JSON.stringify(data)));
  }
  

  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }

}
