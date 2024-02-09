import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-detalle-multimedia',
  templateUrl: './detalle-multimedia.page.html',
  styleUrls: ['./detalle-multimedia.page.scss'],
})
export class DetalleMultimediaPage implements OnInit {

  @Input() multimedia: any;
  viewEntered: any;

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

  openLink(url: string) {
    window.open('https://www.youtube.com/watch?v=' + url, '_system');
  }

}
