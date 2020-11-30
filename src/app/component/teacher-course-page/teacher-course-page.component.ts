import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
// import { FormControl } from '@angular/forms';



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
  contentIdForEdit: number;
  contentToEdit:string;
 
  constructor(public oktaAuth: OktaAuthService, public router: Router, route: ActivatedRoute, private http: HttpClient) { 
    this.action = 0;
    this.courseId = route.snapshot.params['id'];
    this.user = route.snapshot.params['user'];
    // this.newContent = "newString 1";
    // this.addContentForm = new FormControl('');
    
  }

  ngOnInit(): void {
    this.http.get(environment.hostURL + '/course/'+this.courseId+'/content')
    .subscribe(data => this.listOfContents = data['content']);
    
   
  }

  onClickAddContent():void
  {
    this.action = 1;
  }
  addContent():void
  {
    
    console.log(this.newContent);
    this.http.post(environment.hostURL + '/course/'+this.courseId+'/content',{"content":this.newContent}).subscribe();
    window.location.reload();

  }

  onClickDeleteContent():void
  {
    this.action = 2;
  }
  deleteContent(contentId:number): void
  {
    this.http.delete(environment.hostURL + '/course/'+this.courseId+'/content/'+contentId,{}).subscribe();
    window.location.reload();
  }

  onClickModifyContent(): void
  {
    this.action = 3;
  }
  gotoEditContent(id:number,content:string): void
  {
    this.contentIdForEdit = id;
    this.contentToEdit = content;
    this.action = 4;
  }
  modifyContent(contentId:number): void
  {
    this.http.put(environment.hostURL + '/course/'+this.courseId+'/content/'+contentId,{"content":this.newContent}).subscribe();
    window.location.reload();
  }

  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }

}
