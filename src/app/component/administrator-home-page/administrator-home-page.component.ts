import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-administrator-home-page',
  templateUrl: './administrator-home-page.component.html',
  styleUrls: ['./administrator-home-page.component.css']
})
export class AdministratorHomePageComponent implements OnInit {
  listNumber: number;
  listOfCourses: string;
  listOfTeachers: string;
  listOfStudents: string;

  constructor(private http: HttpClient) {
    this.listNumber = 0;
  }

  ngOnInit(): void {
    // an example call that returns users
    // in the data extraction layer, we pull back the first teacher in the list's last name to display
    // this.http.get(environment.hostURL + '/courses')
    //   .subscribe(data => console.log(JSON.stringify(data)));
      this.http.get(environment.hostURL + '/courses')
      .subscribe(data => this.listOfCourses= data['courses']);
    this.http.get(environment.hostURL + '/users')
      .subscribe(data =>{
        this.listOfTeachers = data['teacherUsers'];
        this.listOfStudents = data['studentUsers'];
      }  );
  
  }

  onClickCourses(): void {
    this.listNumber = 1;
  }

  onClickTeachers(): void {
    this.listNumber = 2;
  }

  onClickStudents(): void {
    this.listNumber = 3;
  }


}
