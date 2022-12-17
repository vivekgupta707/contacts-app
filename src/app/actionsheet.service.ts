import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ActionsheetService {
  constructor(private actionSheetCtrl: ActionSheetController) {}
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose from Gallery',
          data: {
            action: 'fromGallery',
          },
        },
        {
          text: 'Take Photo',
          data: {
            action: 'takePhoto',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    return result;
  }
}
