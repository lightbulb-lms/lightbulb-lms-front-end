import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator-home-page',
  templateUrl: './administrator-home-page.component.html',
  styleUrls: ['./administrator-home-page.component.css']
})
export class AdministratorHomePageComponent implements OnInit {
  listNumber : number;

  constructor() {
    this.listNumber = 0;
   }

  ngOnInit(): void {
  }
   
  onClickCourses(): void{
    this.listNumber = 1;
  }
  onClickTeachers(): void{
    this.listNumber = 2;
  }
  onClickStudents(): void{
    this.listNumber = 3;
  }


}
