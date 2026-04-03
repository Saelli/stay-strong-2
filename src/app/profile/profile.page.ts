import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,
  IonButton, IonButtons
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SubscriptionService } from '../core/services/subscription';
import { FavoritesService } from '../core/services/favorites-service';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../core/services/profile';
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
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,   
  ],
})
export class ProfilePage {
  private auth     = inject(AuthService);
  private router   = inject(Router);
  private profile  = inject(ProfileService);
  public  sub      = inject(SubscriptionService);
  public  favs     = inject(FavoritesService);

  get displayName(): string {
    return this.auth.currentUser?.displayName || 'No name set';
  }

  get email(): string {
    return this.auth.currentUser?.email || '';
  }

  get avatarUrl(): string | null {
    return this.profile.avatarUrl || this.auth.currentUser?.photoURL || null;
  }

  get subPlan(): string {
    return this.sub.isSubscribed() ? 'Gold Annual' : 'Free Plan';
  }

  get subExpiry(): string {
    return this.sub.isSubscribed() ? 'Renews April 5, 2026' : 'Upgrade for full access';
  }

  constructor() {
    addIcons({
      personCircleOutline, cardOutline, settingsOutline,
      logOutOutline, helpCircleOutline, chevronForwardOutline
    });
  }

  goToSubscription() { this.router.navigate(['/subscription-detail']); }
  goToSettings()     { this.router.navigate(['/settings']); }
  needHelp()         { this.router.navigate(['/help']); }

  async logOut() {
    this.sub.setSubscribed(false);
    await this.auth.logout();
  }
}