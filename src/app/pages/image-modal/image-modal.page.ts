import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements AfterViewInit {
  @Input() imgSrc: string  = '';
  @ViewChild('myImage') myImage!: ElementRef;

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
    let posX = 0;
    let posY = 0;
    let lastPosX = 0;
    let lastPosY = 0;

    hammertime.on('pinch pinchend pan', (ev) => {
      if (ev.type === 'pinch') {
        currentScale = Math.max(1, Math.min(lastScale * ev.scale, 10));
      }
      if (ev.type === 'pinchend') {
        lastScale = currentScale;
      }
      if (ev.type === 'pan') {
        posX = lastPosX + ev.deltaX;
        posY = lastPosY + ev.deltaY;
      }
      if (ev.type === 'panend') {
        lastPosX = posX;
        lastPosY = posY;
      }
      element.style.transform = `translate(${posX}px, ${posY}px) scale(${currentScale})`;
    });
  }

  downloadImage(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloaded-image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
