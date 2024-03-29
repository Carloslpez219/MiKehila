import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-detalle-photoalbum',
  templateUrl: './detalle-photoalbum.page.html',
  styleUrls: ['./detalle-photoalbum.page.scss'],
})
export class DetallePhotoalbumPage implements OnInit {

  @Input() multimedia: any;
  viewEntered: any;
  currentSlide = 0;

  constructor(private modalController: ModalController, private loadingController: LoadingController, private platform: Platform) { }

  ngOnInit() {
     (this.multimedia)
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    this.loadingController.dismiss();
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  back(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    this.modalController.dismiss();
  }

  next() {
    if (this.currentSlide < this.multimedia.imagenes.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  previous() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.multimedia.imagenes.length - 1;
    }
  }

  async openModal(imgSrc: string) {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        'imgSrc': imgSrc
      }
    });
    return await modal.present();
  }

}
