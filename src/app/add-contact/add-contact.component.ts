import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Platform, ToastController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import { CameraService } from '../camera.service';
import { ActionsheetService } from '../actionsheet.service';
import { UpdateService } from '../update.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  constructor(
    private actionSheetService: ActionsheetService,
    private cameraService: CameraService,
    private updateService: UpdateService,
    private platform: Platform,
    private firebase: FirebaseService,
    private router: Router,
    private toastController: ToastController
  ) {}

  contactForm!: FormGroup;
  picAction: string = '';
  profilePic: boolean = false;
  fileUrl!: string;

  ngOnInit() {
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
  onSubmit() {
    if (this.contactForm.valid) {
      this.firebase.postNewContact(this.contactForm.value).subscribe((data) => {
        this.presentToast('top', 'Contact Saved Successfully !');
        this.updateService.update.next('contact added');
        this.router.navigate(['tabs', 'contacts']);
      });
    }
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
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
        (imageData) => {
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
        (imageData) => {
          this.setPicture(imageData);
        },
        (err) => {
          alert('Photo can not be selected');
        }
      );
    }
  }
  setPicture(imageData: string) {
    this.fileUrl = 'data:image/jpeg;base64,' + imageData;
    this.contactForm.patchValue({ image: this.fileUrl });
    this.profilePic = true;
  }
}
