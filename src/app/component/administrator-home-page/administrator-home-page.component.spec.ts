import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdministratorHomePageComponent} from './administrator-home-page.component';
import {HttpClientModule} from '@angular/common/http';

describe('AdministratorHomePageComponent', () => {
  let component: AdministratorHomePageComponent;
  let fixture: ComponentFixture<AdministratorHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
