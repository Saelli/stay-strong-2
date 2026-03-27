import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'store-checkout',
    loadComponent: () =>
      import('./store-checkout/store-checkout.page').then(m => m.StoreCheckoutPage),
  },
  {
    path: 'video/:id',
    loadComponent: () =>
      import('./video-player/video-player.page').then(m => m.VideoPlayerPage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then(m => m.SettingsPage),
  },
  {
    path: 'subscription-detail',
    loadComponent: () =>
      import('./subscription-detail/subscription-detail.page').then(m => m.SubscriptionDetailPage),
  },
  {
    path: 'subscription-detail',
    loadComponent: () => import('./subscription-detail/subscription-detail.page').then( m => m.SubscriptionDetailPage)
  },
];