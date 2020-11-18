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
  lastNameOfFirstTeacher: string;

  constructor(private http: HttpClient) {
    this.listNumber = 0;
  }

  ngOnInit(): void {
    // an example call that returns users
    // in the data extraction layer, we pull back the first teacher in the list's last name to display
    this.http.get(environment.hostURL + '/users')
      .subscribe(data => this.lastNameOfFirstTeacher = data['adminUsers'][0]['lastName']);
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
