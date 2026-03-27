import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();
import { Router } from '@angular/router';
import { VideoService, Video } from '../core/services/video';
import { SubscriptionService } from '../core/services/subscription';
import { FavoritesService } from '../core/services/favorites-service';
import { addIcons } from 'ionicons';
import { star, playCircle, heart, heartOutline, lockClosed } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonIcon,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab1Page {
  playlist: Video[] = [];

  constructor(
    public sub: SubscriptionService,
    public favs: FavoritesService,
    private router: Router,
    private videos: VideoService,
  ) {
    addIcons({ star, playCircle, heart, heartOutline, lockClosed });
    this.playlist = this.videos.list();
  }

  play(v: Video) {
    this.router.navigate(['/video', v.id]);
  }

  toggleFav(event: Event, v: Video) {
    event.stopPropagation();
    this.favs.toggle(v.id);
  }
}