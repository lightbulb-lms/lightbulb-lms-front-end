import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {OktaAuthService} from "@okta/okta-angular";
import {ActivatedRoute, Router} from "@angular/router";


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
  newContent: string;
  addContentForm;


  constructor(public oktaAuth: OktaAuthService, public router: Router, route: ActivatedRoute, private http: HttpClient) {
    this.action = 0;
    this.courseId = route.snapshot.params['id'];
    this.user = route.snapshot.params['user'];
    // this.newContent = "newString 1";
    // this.addContentForm = new FormControl('');

  }

  ngOnInit(): void {
    this.http.get(environment.hostURL + '/course/' + this.courseId + '/content')
      .subscribe(data => this.listOfContents = data['content']);
    // this.http.post(environment.hostURL + '/course/'+this.courseId+'/content',{"content":"string"}).subscribe(data => console.log(JSON.stringify(data)));
    this.http.delete(environment.hostURL + '/course/' + this.courseId + '/content/7', {}).subscribe();
    this.http.get(environment.hostURL + '/course/' + this.courseId + '/content')
      .subscribe(data => console.log(JSON.stringify(data)));
  }

  onClickAddContent(): void {
    this.action = 1;
  }

  addContent(): void {
    console.log(this.newContent);
    // this.newContent =this.addContentForm;
    // this.http.post(environment.hostURL + '/course/' + this.courseId + '/content', {"content": this.newContent}).subscribe(data => console.log(JSON.stringify(data)));
  }


  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }

}
