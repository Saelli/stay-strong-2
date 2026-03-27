import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreCheckoutPage } from './store-checkout.page';

describe('StoreCheckoutPage', () => {
  let component: StoreCheckoutPage;
  let fixture: ComponentFixture<StoreCheckoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
