import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-admin-course-management',
  templateUrl: './admin-course-management.component.html',
  styleUrls: ['./admin-course-management.component.css']
})
export class AdminCourseManagementComponent implements OnInit 
{
  user:string;
  action:number;
  listOfCourses:string;
  code:string;
  title:string;
  description:string;
  userId:string;
  addUser:boolean;
  courseId:number;
  listOfMembers:string;

  constructor(public oktaAuth: OktaAuthService, public router: Router, route: ActivatedRoute, private http: HttpClient)
  {
    this.user = route.snapshot.params['user'];
    this.action = 0;
    this.addUser = false;
    this.http.get(environment.hostURL + '/courses')
      .subscribe(data => this.listOfCourses= data['courses']);
  }

  ngOnInit(): void {
  }
  async logout(): Promise<void> {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }
  
  onClickCreateCourse():void 
  {
    this.action = 1;
  }
  createCourse(): void
  {
    this.http.post(environment.hostURL + '/course',{"courseCode": this.code,"description": this.description,"title": this.title}).subscribe(data => console.log(JSON.stringify(data)));
    window.location.reload();
  }

  onClickAssignUser():void 
  {
    this.action = 2;
  }
  onClickAddUserCourse(id,code,title):void
  {
    this.action = 3;
    this.courseId = id;
    this.code = code;
    this.title = title;
  }
  assignUser():void
  {
    this.http.post(environment.hostURL + '/course/'+this.courseId+'/member',{"uId": this.userId}).subscribe(data => console.log(JSON.stringify(data)));
    this.action = 2;
  }

  onClickViewMembers():void 
  {
    this.action = 4;
  }
  onClickViewMembersOfCourse(id,code,title):void 
  {
    
    this.code = code;
    this.title = title;
    this.action = 5 ;
    this.viewMembers(id);

  }
  viewMembers(id):void 
  {
    this.courseId = id;
    this.http.get(environment.hostURL + '/course/'+this.courseId+'/members').subscribe(data => this.listOfMembers=data['members']);
  }

  onClickDeleteMember():void
  {
    this.action = 6
  }
  viewMembersForDeletion(id):void 
  {
    this.courseId = id;
    this.http.get(environment.hostURL + '/course/'+this.courseId+'/members').subscribe(data => this.listOfMembers=data['members']);
    this.action = 7;
  }

  deleteMember(id):void
  {
    this.userId = id;
    const options ={headers:{'Content-Type':'application/json'},body:{'userId':this.userId}};
    this.http.delete(environment.hostURL + '/course/'+this.courseId+'/member',options).subscribe();
    window.location.reload();

  }

}
