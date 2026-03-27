import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SubscriptionService } from '../core/services/subscription';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: 'subscription-detail.page.html',
  styleUrls: ['subscription-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon,
  ],
})
export class SubscriptionDetailPage {
  selectedPlan: 'silver' | 'gold' = 'gold';

  constructor(
    public sub: SubscriptionService,
    private router: Router,
  ) {
    addIcons({ checkmarkCircle, closeCircle, starOutline });
  }

  selectPlan(plan: 'silver' | 'gold') {
    this.selectedPlan = plan;
  }

  goToCheckout() {
    this.router.navigateByUrl('/store-checkout?plan=' + this.selectedPlan);
  }

  cancelSubscription() {
    this.sub.setSubscribed(false);
    this.router.navigate(['/tabs/tab4']);
  }
}