import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleFamiliarPage } from './detalle-familiar.page';

describe('DetalleFamiliarPage', () => {
  let component: DetalleFamiliarPage;
  let fixture: ComponentFixture<DetalleFamiliarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleFamiliarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
