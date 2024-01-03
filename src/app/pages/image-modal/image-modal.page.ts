import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements AfterViewInit {
  @Input() imgSrc!: string;
  @ViewChild('myImage')
  myImage!: ElementRef;

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    const element = this.myImage.nativeElement;
    const hammertime = new Hammer(element, {
      recognizers: [
        [Hammer.Pinch, { enable: true }],
        [Hammer.Pan, { direction: Hammer.DIRECTION_ALL }],
      ],
    });

    let lastScale = 1;
    let currentScale = 1;

    hammertime.on('pinch pinchend pan', (ev) => {
      if (ev.type === 'pinch') {
        currentScale = lastScale * ev.scale;
        element.style.transform = `scale(${currentScale})`;
      }
      if (ev.type === 'pinchend') {
        lastScale = currentScale;
      }
      if (ev.type === 'pan') {
        element.style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px) scale(${currentScale})`;
      }
    });
  }

  downloadImage(url: string) {
    // Crear un elemento <a> temporal
    const a = document.createElement('a');
    // Poner la URL de la imagen en el href
    a.href = url;
    // Establecer el atributo de descarga con un nombre de archivo
    a.download = 'downloaded-image.png'; // Puedes elegir un nombre diferente
    // Agregar el elemento <a> al DOM
    document.body.appendChild(a);
    // Hacer clic en el enlace
    a.click();
    // Eliminar el elemento <a> del DOM
    document.body.removeChild(a);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
