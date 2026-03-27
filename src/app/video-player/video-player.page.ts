import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService, Video } from '../core/services/video';
import { SubscriptionService } from '../core/services/subscription';
import { FavoritesService } from '../core/services/favorites-service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonButton, IonIcon
  ],
})
export class VideoPlayerPage {
  video: Video | undefined;
  isSubscribed = false;
  safeUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videos: VideoService,
    public favs: FavoritesService,
    private sub: SubscriptionService,
    private sanitizer: DomSanitizer,
  ) {
    addIcons({ heart, heartOutline });
    const id = this.route.snapshot.paramMap.get('id');
    this.video = this.videos.getById(id ?? '');
    this.isSubscribed = this.sub.isSubscribed();

    if (this.video && (!this.video.locked || this.isSubscribed)) {
      const url = `https://player.vimeo.com/video/${this.video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  goToStore() {
    this.router.navigate(['/tabs/tab2']);
  }
}