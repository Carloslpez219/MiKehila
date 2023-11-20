import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AsmsServiceService } from '../services/asms-service.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  segmento = 'notificaciones';
  postIts: any;
  circulares: any;

  constructor(private asmsService: AsmsServiceService, private navCtrl:NavController) {}

  async ngOnInit() {
    (await this.asmsService.getPostIts()).subscribe((resp: any)=>{
      this.postIts = resp;
      console.log(this.postIts)
    });
    (await this.asmsService.getCirculares()).subscribe((res: any)=>{
      this.circulares = res;
      console.log(this.circulares)
    })
  }

  openLink(url: string) {
    window.open(url, '_system');
  }

  segment(ev: any){
    if(ev.detail.value === 'multimedia'){
      this.segmento = 'multimedia';
    }else if(ev.detail.value === 'pinboard'){
      this.segmento = 'pinboard';
    }else if(ev.detail.value === 'circulares'){
      this.segmento = 'circulares';
    }else if(ev.detail.value === 'notificaciones'){
      this.segmento = 'notificaciones';
    }
  }

  toMultimedia(){
    this.navCtrl.navigateForward('/multimedia');
  }

  toPhoto(){
    this.navCtrl.navigateForward('/photoalbum');
  }
}
