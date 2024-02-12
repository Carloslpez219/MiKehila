import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AsmsServiceService } from 'src/app/services/asms-service.service';
import { ChatPage } from '../chat/chat.page';

//JC
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  chats: any;
  comunity: any;

  constructor(private asmsService: AsmsServiceService, private navCtrl: NavController, private route: ActivatedRoute, 
    public loadingController: LoadingController, private modalController: ModalController) { }

  async ngOnInit() {
    this.presentLoading();
    (await this.asmsService.getChats()).subscribe((resp:any)=>{
       (resp);
      this.chats = resp.data;
      this.loadingController.dismiss();
    });
    (await this.asmsService.getComunity()).subscribe((resp:any)=>{
       (resp);
      this.comunity = resp;
    });
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      const dialog = params['dialog'];
      console.log(dialog);
      if (this.chats != null && dialog != '') {
        this.chats.forEach((objeto:any) => {
          if (objeto.dialogo == dialog) {
            this.mostrarModal(objeto);
          }
        });
      }
    });
  }

   async mostrarModal( item: any ) {
    const object = item;
    await this.presentLoading();
     (await this.asmsService.getMessages(item.dialogo)).subscribe(async (resp: any) =>{
       (resp);
         const messages =  resp.data;
         const page = 'messages';
         const modal = await this.modalController.create({
           component: ChatPage,
           backdropDismiss: false,
           componentProps: { object, page, messages }
         });
         await modal.present();      

        const value: any = await modal.onDidDismiss();
        if(value.data === true){
          (await this.asmsService.getChats()).subscribe((resp:any)=>{
             (resp);
            this.chats = resp.data;
            this.loadingController.dismiss();
          });
          (await this.asmsService.getComunity()).subscribe((resp:any)=>{
             (resp);
            this.comunity = resp;
          });
        }
      
     },
     (error: any) => {
       console.error('Error al obtener actividad:', error);
     }
     ); 
  } 

  back(){
    this.navCtrl.back({animated: true});
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async newChat(ev: any){
    this.comunity = null;
    await this.presentLoading();

    const object = ev.detail.value;
    const page = 'newChat';
    const messages = '';
    const modal = await this.modalController.create({
      component: ChatPage,
      backdropDismiss: false,
      componentProps: { object, page, messages }
    });
    await modal.present();      
      
    const value: any = await modal.onDidDismiss();
        if(value.data === true){
          (await this.asmsService.getChats()).subscribe((resp:any)=>{
             (resp);
            this.chats = resp.data;
            this.loadingController.dismiss();
          });
          (await this.asmsService.getComunity()).subscribe((resp:any)=>{
             (resp);
            this.comunity = resp;
          });
        }
  }

}
