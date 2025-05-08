import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleCircularPage } from './detalle-circular.page';

describe('DetalleCircularPage', () => {
  let component: DetalleCircularPage;
  let fixture: ComponentFixture<DetalleCircularPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleCircularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
