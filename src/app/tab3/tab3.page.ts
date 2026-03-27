import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { VideoService, Video } from '../core/services/video';
import { SubscriptionService } from '../core/services/subscription';
import { FavoritesService } from '../core/services/favorites-service';
import { addIcons } from 'ionicons';
import { heart, heartOutline, playCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon],
})
export class Tab3Page {
  allVideos: Video[] = [];

  constructor(
    private videos: VideoService,
    private router: Router,
    public sub: SubscriptionService,
    public favs: FavoritesService,
  ) {
    addIcons({ heart, heartOutline, playCircle });
    this.allVideos = this.videos.list();
  }

  get favorites(): Video[] {
    return this.allVideos.filter(v => this.favs.isFavorite(v.id));
  }

  play(v: Video) {
    this.router.navigate(['/video', v.id]);
  }

  removeFav(event: Event, v: Video) {
    event.stopPropagation();
    this.favs.toggle(v.id);
  }
}