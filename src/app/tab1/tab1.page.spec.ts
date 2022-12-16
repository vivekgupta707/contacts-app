import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [HttpClient, CallNumber],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete data on calling deletecontact', fakeAsync(() => {
    component.results = [
      {
        _id: '',
        image: '',
        name: 'vivek',
        phone: '7705013755',
        address: '',
        notes: '',
        email: '',
      },
    ];
    const firebaseService = fixture.debugElement.injector.get(FirebaseService);
    spyOn(firebaseService, 'deleteOneContact').and.returnValue(
      of([{ name: 'vivek', phone: '7705013755' }])
    );
    component.deleteContact('asdcf', 0);
    fixture.detectChanges();
    tick(1000);
    expect(component.results.length).toEqual(0);
  }));
  it('should get data on ngOnInit', fakeAsync(() => {
    const firebaseService = fixture.debugElement.injector.get(FirebaseService);
    spyOn(firebaseService, 'getAllContact').and.returnValue(
      of([{ name: 'vivek', phone: '7705013755' }])
    );
    component.ngOnInit();
    fixture.detectChanges();
    tick(1000);
    expect(component.contactList).toBeTruthy();
  }));
});
