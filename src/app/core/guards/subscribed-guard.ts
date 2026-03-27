import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription';

export const subscribedGuard: CanActivateFn = () => {
  const sub = inject(SubscriptionService);
  const router = inject(Router);

  if (sub.isSubscribed()) {
    return true;
  }

  // Not subscribed → send to store with a hint message
  router.navigate(['/tabs/tab2']);
  return false;
};