import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePinboardPage } from './detalle-pinboard.page';

describe('DetallePinboardPage', () => {
  let component: DetallePinboardPage;
  let fixture: ComponentFixture<DetallePinboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetallePinboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
