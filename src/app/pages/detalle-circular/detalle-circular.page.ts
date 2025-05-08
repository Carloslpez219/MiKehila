import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Gesture, GestureController, GestureDetail, IonImg, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-circular',
  templateUrl: './detalle-circular.page.html',
  styleUrls: ['./detalle-circular.page.scss'],
})
export class DetalleCircularPage implements OnInit {

  @Input() imgSrc: string  = '';
  @Input() type: string = '';
  @Input() titulo: any  = '';
  @Input() descripcion: any  = '';
  zoom: number = 1.0; // Valor inicial del zoom
  hTranslate: number = 0;
  vTranslate: number = 0;
  initialh: number = 0;
  initialv: number = 0;
  started: boolean = false;
  
  @ViewChild(IonImg, { read: ElementRef }) dragElement?: ElementRef<HTMLIonImgElement>;
  private gesture!: Gesture;

  constructor(private modalCtrl: ModalController, private sanitizer: DomSanitizer, private gestureCtrl: GestureController) { }

  ngOnInit() {
    this.descripcion = this.descripcion.replace("(Ver documento adjunto)", "");
    this.getSafeComponent();
  }

  getSafeComponent() {
    this.descripcion = this.sanitizer.bypassSecurityTrustHtml(this.descripcion);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  abrirEnlace(link: string) {
    window.open(link, '_system');
  }

  zoomIn() {
    this.zoom += 0.2;
     ("x")
  }

  zoomOut() {
    if (this.zoom > 1.0) this.zoom -= 0.2;
    if (this.zoom <= 1.1) this.reset();
  }

  reset() {
    this.zoom = 1.0;
    this.initialh = 0;
    this.initialv = 0;
    this.hTranslate = 0;
    this.vTranslate = 0;
    this.dragElement!.nativeElement.style.transform = `translate(0,0) scale(${this.zoom})`;
  }

  // CONTROLS
  private onMove(ev: GestureDetail) {
    if(this.zoom > 1.0){
      if (!this.started){
        this.initialh = this.hTranslate;
        this.initialv = this.vTranslate;
        this.started = true;
      }
      this.hTranslate = this.initialh + ev.deltaX;
      this.vTranslate = this.initialv + ev.deltaY;
      // console.log(this.hTranslate, this.vTranslate);
      this.dragElement!.nativeElement.style.transform = `translate(${this.hTranslate}px, ${this.vTranslate}px) scale(${this.zoom})`;
    }
  }

  ngAfterViewInit() {
    const gesture = (this.gesture = this.gestureCtrl.create({
      el: this.dragElement!.nativeElement,
      threshold: 0,
      gestureName: 'img-drag',
      onMove: (ev) => this.onMove(ev),
      onEnd: (ev) => {
        this.started = !this.started;
      }
    }));
    gesture.enable(true);
  }
}
