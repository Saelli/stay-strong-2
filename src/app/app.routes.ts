import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/tab1',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'tabs',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./tabs/tabs.routes').then(m => m.routes),
  },
  {
    path: 'store-checkout',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./store-checkout/store-checkout.page').then(m => m.StoreCheckoutPage),
  },
  {
    path: 'video/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./video-player/video-player.page').then(m => m.VideoPlayerPage),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./settings/settings.page').then(m => m.SettingsPage),
  },
  {
    path: 'subscription-detail',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./subscription-detail/subscription-detail.page').then(m => m.SubscriptionDetailPage),
  },
  {
    path: 'help',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./help/help.page').then(m => m.HelpPage),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
