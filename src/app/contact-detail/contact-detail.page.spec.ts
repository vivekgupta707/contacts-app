import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterModule,
} from '@angular/router';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ActionsheetService } from '../actionsheet.service';
import { AppRoutingModule } from '../app-routing.module';
import { FirebaseService } from '../firebase.service';

import { ContactDetailPage } from './contact-detail.page';

describe('ContactDetailPage', () => {
  let component: ContactDetailPage;
  let fixture: ComponentFixture<ContactDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDetailPage],
      imports: [IonicModule.forRoot(), HttpClientModule, RouterModule],
      providers: [
        HttpClient,
        Camera,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return '-NISrizgrRsfJfsl9oD8';
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should init contact form', () => {
    expect(component.contactForm).toBeTruthy();
  });
  it('on calling onEdit() mode should change', () => {
    component.onEdit();
    expect(component.mode).toEqual('edit');
  });
  it('on calling onSave() mode should change', () => {
    component.onSave();
    expect(component.mode).toEqual('show');
  });

  it('should get data on ngOnInit', fakeAsync(() => {
    const firebaseService = fixture.debugElement.injector.get(FirebaseService);
    spyOn(firebaseService, 'getSpecificContact').and.returnValue(
      of({
        _id: '',
        image: '',
        name: 'vivek',
        phone: '7705013755',
        address: '',
        notes: '',
        email: '',
      })
    );
    component.ngOnInit();
    fixture.detectChanges();
    tick(1000);
    expect(component.Contact).toBeTruthy();
  }));
});
