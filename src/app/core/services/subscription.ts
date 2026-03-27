import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private subscribed = false;

  isSubscribed(): boolean {
    return this.subscribed;
  }

  setSubscribed(value: boolean) {
    this.subscribed = value;
  }
}