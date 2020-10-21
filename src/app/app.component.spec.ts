import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {OktaAuthService} from '@okta/okta-angular';
import {of} from 'rxjs';

describe('AppComponent', () => {
  const oktaAuthServiceStub: Partial<OktaAuthService> = {
    $authenticationState: of(true)
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: OktaAuthService, useValue: oktaAuthServiceStub}],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
