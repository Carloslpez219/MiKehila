import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-detalle-familiar',
  templateUrl: './detalle-familiar.page.html',
  styleUrls: ['./detalle-familiar.page.scss'],
})
export class DetalleFamiliarPage implements OnInit {

  @Input() multimedia: any;
  viewEntered: any;

  constructor(private modalController: ModalController, private loadingController: LoadingController, private platform: Platform) { }

  ngOnInit() {
    console.log(this.multimedia)
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

}
