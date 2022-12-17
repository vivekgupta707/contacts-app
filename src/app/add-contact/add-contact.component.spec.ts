import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { FirebaseService } from '../firebase.service';

import { AddContactComponent } from './add-contact.component';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddContactComponent],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [Camera, HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should init edit form', () => {
    expect(component.contactForm).toBeTruthy();
  });
  it('should set profilePic to true on calling setPicture', () => {
    component.setPicture('asdfg');
    expect(component.profilePic).toBeTrue();
  });
  it('should get data on ngOnInit', fakeAsync(() => {
    const firebaseService = fixture.debugElement.injector.get(FirebaseService);
    spyOn(firebaseService, 'postNewContact').and.returnValue(
      of([{ name: 'vivek', phone: '7705013755' }])
    );
    component.onSubmit();
    fixture.detectChanges();
    tick(1000);
    expect(
      component.presentToast('top', 'Contact Saved Successfully !')
    ).toBeDefined();
  }));
});
