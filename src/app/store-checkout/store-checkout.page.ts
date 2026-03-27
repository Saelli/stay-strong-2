import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../core/services/subscription';
import { addIcons } from 'ionicons';
import { checkmarkCircle, cardOutline, lockClosedOutline } from 'ionicons/icons';

type PayState = 'idle' | 'processing' | 'success';

@Component({
  selector: 'app-store-checkout',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon,
  ],
  templateUrl: './store-checkout.page.html',
  styleUrls: ['./store-checkout.page.scss'],
})
export class StoreCheckoutPage {
  plan: 'silver' | 'gold' = 'gold';
  payState: PayState = 'idle';

  get planLabel()  { return this.plan === 'gold' ? 'Gold Annual'     : 'Silver Monthly'; }
  get planPrice()  { return this.plan === 'gold' ? '$99.99 / year'   : '$19.99 / month'; }
  get planSaving() { return this.plan === 'gold' ? 'Save $139.89 vs monthly' : null; }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sub: SubscriptionService,
  ) {
    addIcons({ checkmarkCircle, cardOutline, lockClosedOutline });
    const p = this.route.snapshot.queryParamMap.get('plan');
    if (p === 'silver' || p === 'gold') this.plan = p;
  }

  buy() {
    if (this.payState !== 'idle') return;
    this.payState = 'processing';

    // Simulate payment processing (1.8 s)
    setTimeout(() => {
      this.payState = 'success';
      this.sub.setSubscribed(true);          // mark user as subscribed

      // Redirect to profile after showing success (1.5 s)
      setTimeout(() => {
        this.router.navigate(['/tabs/tab4']);
      }, 1500);
    }, 1800);
  }
}