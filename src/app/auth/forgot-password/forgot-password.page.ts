import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonButton, IonInput,
  IonItem, IonText, IonSpinner, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosedOutline, arrowBackOutline } from 'ionicons/icons';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['../login/login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonButton, IonInput,
    IonItem, IonText, IonSpinner, IonIcon
  ]
})
export class ForgotPasswordPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  loading = false;
  error = '';
  sent = false;

  constructor() {
    addIcons({ lockClosedOutline, arrowBackOutline });
  }

  async onSendLink() {
    if (!this.email) {
      this.error = 'Please enter your email address.';
      return;
    }
    this.error = '';
    this.loading = true;
    try {
      await this.authService.sendPasswordReset(this.email);
      this.sent = true;
    } catch (e: any) {
      this.error = this.friendlyError(e.code);
    } finally {
      this.loading = false;
    }
  }

  private friendlyError(code: string): string {
    const map: Record<string, string> = {
      'auth/user-not-found': 'No account found with this email.',
      'auth/invalid-email':  'Please enter a valid email address.',
      'auth/network-request-failed': 'Network error. Check your connection.',
    };
    return map[code] ?? 'Something went wrong. Please try again.';
  }

  goBack() { this.router.navigateByUrl('/auth/login'); }
}