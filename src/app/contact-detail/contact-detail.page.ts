import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../contact';
import { CameraService } from '../camera.service';
import { ActionsheetService } from '../actionsheet.service';
import { UpdateService } from '../update.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService,
    private actionSheetService: ActionsheetService,
    private cameraService: CameraService,
    private platform: Platform,
    private updateService: UpdateService
  ) {}
  firebaseId!: string;
  Contact!: Contact;
  mode: string = 'show';
  picAction: string = '';
  contactForm!: FormGroup;
  ngOnInit() {
    this.firebaseId = this.route.snapshot.paramMap.get('id')!;
    this.firebase.getSpecificContact(this.firebaseId).subscribe((res) => {
      this.Contact = res;
    });
    this.contactForm = new FormGroup({
      image: new FormControl(null),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('[1-9]{1}[0-9]{2,19}'),
      ]),
      email: new FormControl(null, Validators.email),
      address: new FormControl(null, [
        Validators.minLength(5),
        Validators.maxLength(200),
      ]),
      notes: new FormControl(null, [
        Validators.minLength(5),
        Validators.maxLength(200),
      ]),
    });
  }
  onEdit() {
    this.mode = 'edit';
    this.contactForm.setValue({
      image: this.Contact.image || null,
      name: this.Contact.name,
      phone: this.Contact.phone,
      email: this.Contact.email || null,
      address: this.Contact.address || null,
      notes: this.Contact.notes || null,
    });
  }
  onSave() {
    if (this.contactForm.valid) {
      this.firebase
        .editContact(this.firebaseId, this.contactForm.value)
        .subscribe(() => {
          alert('Contact Upadated Successfully...');
          this.updateService.update.next('contact edited');
        });
    }
    this.mode = 'show';
  }
  async presentActionSheet() {
    const result = await this.actionSheetService.presentActionSheet();
    this.picAction = result.data?.action;
    if (this.picAction === 'takePhoto') {
      this.captureCamera();
    }
    if (this.picAction === 'fromGallery') {
      this.fromGallery();
    }
  }
  captureCamera() {
    if (this.platform.is('android')) {
      this.cameraService.captureCamera().then(
        (imageData: string) => {
          this.setPicture(imageData);
        },
        (err) => {
          alert('Photo can not be selected');
        }
      );
    }
  }
  fromGallery() {
    if (this.platform.is('android')) {
      this.cameraService.fromGallery().then(
        (imageData: string) => {
          this.setPicture(imageData);
        },
        (err) => {
          alert('Photo can not be selected');
        }
      );
    }
  }
  setPicture(imageData: string) {
    this.Contact.image = 'data:image/jpeg;base64,' + imageData;
    this.contactForm.patchValue({ image: this.Contact.image });
  }
}
