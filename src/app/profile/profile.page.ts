import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,
  IonButton, IonButtons, IonModal } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SubscriptionService } from '../core/services/subscription';
import { FavoritesService } from '../core/services/favorites-service';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, cardOutline, settingsOutline,
  logOutOutline, helpCircleOutline, chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [IonModal, 
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,
    IonButton, IonButtons,
  ],
})
export class ProfilePage {
  name     = 'Jane Doe';
  email    = 'jane@example.com';
  location = 'New York, USA';
  avatarUrl: string | null = null;

  get subPlan(): string {
    return this.sub.isSubscribed() ? 'Gold Annual' : 'Free Plan';
  }

  get subExpiry(): string {
    return this.sub.isSubscribed() ? 'Renews April 5, 2026' : 'Upgrade for full access';
  }

  constructor(
    public sub: SubscriptionService,
    public favs: FavoritesService,
    private router: Router,
  ) {
    addIcons({
      personCircleOutline, cardOutline, settingsOutline,
      logOutOutline, helpCircleOutline, chevronForwardOutline
    });
  }

  goToSubscription() {
    this.router.navigate(['/subscription-detail']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  needHelp() { /* placeholder */ }

  logOut() {
    this.sub.setSubscribed(false);
    this.router.navigate(['/tabs/tab1']);
  }
}