import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  imageTaken: any; 

  constructor(public alertController:AlertController, private camera: Camera) {}
  
  
  takePhoto() {

    // Options of the image taken 
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    // Invoke the camera to take the picture
    this.camera.getPicture(options).then((imageData) => {

      // Asign the image taken to the image attribute
      this.imageTaken = 'data:image/jpeg;base64,' + imageData;
      
     }, (err) => {
       // Handle error
        this.presentAlertError ();
     });

  }

  /**
   * Present a box dialog to inform about a problem with the action of taking an image
   */
  async presentAlertError (){
    const alert = await this.alertController.create({
      header: 'ERROR',
      subHeader: 'Image error',
      message: 'There was an error taking the photo.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
