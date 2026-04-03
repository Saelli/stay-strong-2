import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon, IonItem, IonInput, IonButton, IonSpinner, IonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, personOutline, mailOutline, locationOutline } from 'ionicons/icons';

import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../core/services/profile';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon, IonItem, IonInput, IonButton, IonSpinner, IonText,
  ],
})
export class SettingsPage {
  private auth    = inject(AuthService);
  private profile = inject(ProfileService);

  name     = '';
  email    = '';
  location = '';
  avatarUrl: string | null = null;

  loading = false;
  saved   = false;
  error   = '';

  constructor() {
    addIcons({ cameraOutline, personOutline, mailOutline, locationOutline });
    this.name     = this.auth.currentUser?.displayName || '';
    this.email    = this.auth.currentUser?.email || '';
    this.location = this.profile.location;
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

  async save() {
    const name = this.name.trim();
    if (!name) {
      this.error = 'Name cannot be empty.';
      return;
    }
    this.error = '';
    this.loading = true;
    try {
      await this.auth.updateUserProfile({ displayName: name });
      this.profile.location = this.location.trim();
      this.saved = true;
      setTimeout(() => this.saved = false, 2000);
    } catch (e: any) {
      this.error = e.message || 'Failed to save changes.';
    } finally {
      this.loading = false;
    }
  }
}
