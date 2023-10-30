import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMultimediaPage } from './detalle-multimedia.page';

describe('DetalleMultimediaPage', () => {
  let component: DetalleMultimediaPage;
  let fixture: ComponentFixture<DetalleMultimediaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleMultimediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
