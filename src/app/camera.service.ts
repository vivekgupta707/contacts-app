import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor(private camera: Camera) {}
  optionsCamera: CameraOptions = {
    quality: 10,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 100,
  };
  captureCamera() {
    return this.camera.getPicture(this.optionsCamera);
  }
  fromGallery() {
    return this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      ...this.optionsCamera,
    });
  }
}
