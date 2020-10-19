import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProtectedComponent} from './protected.component';
import {OktaAuthService, UserClaims} from '@okta/okta-angular';

describe('ProtectedComponent', () => {
  let component: ProtectedComponent;
  let fixture: ComponentFixture<ProtectedComponent>;
  const userClaimObject: UserClaims = {sub: '', isAdmin: false, isStudent: true, isTeacher: false};
  const oktaAuthServiceStub: Partial<OktaAuthService> = {
    getUser(): Promise<UserClaims> {
      return Promise.resolve(userClaimObject);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectedComponent],
      providers: [{provide: OktaAuthService, useValue: oktaAuthServiceStub}],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
