import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, personOutline, mailOutline, locationOutline } from 'ionicons/icons';

// Simple shared profile state service
import { ProfileService } from '../core/services/profile';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon,
  ],
})
export class SettingsPage {
  name     = '';
  email    = '';
  location = '';
  avatarUrl: string | null = null;

  saved = false;

  constructor(private profile: ProfileService) {
    addIcons({ cameraOutline, personOutline, mailOutline, locationOutline });
    this.name      = this.profile.name;
    this.email     = this.profile.email;
    this.location  = this.profile.location;
    this.avatarUrl = this.profile.avatarUrl;
  }

  onPhotoSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarUrl = reader.result as string;
      this.profile.avatarUrl = this.avatarUrl;
    };
    reader.readAsDataURL(file);
  }

  save() {
    this.profile.name     = this.name.trim()     || this.profile.name;
    this.profile.email    = this.email.trim()    || this.profile.email;
    this.profile.location = this.location.trim() || this.profile.location;
    this.saved = true;
    setTimeout(() => this.saved = false, 2000);
  }
}