import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonButton, IonInput,
  IonItem, IonText, IonSpinner, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { flashOutline } from 'ionicons/icons';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../login/login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonButton, IonInput,
    IonItem, IonText, IonSpinner, IonIcon
  ]
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  error = '';

  constructor() {
    addIcons({ flashOutline });
  }

  async onRegister() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields.';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    this.error = '';
    this.loading = true;
    try {
      await this.authService.register(this.email, this.password, this.name);
      // Sign out after registration so user goes to login
      await this.authService.logout();
      this.router.navigateByUrl('/auth/login', { replaceUrl: true });
    } catch (e: any) {
      this.error = this.friendlyError(e.code);
    } finally {
      this.loading = false;
    }
  }

  private friendlyError(code: string): string {
    const map: Record<string, string> = {
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/invalid-email':        'Please enter a valid email address.',
      'auth/weak-password':        'Password should be at least 6 characters.',
      'auth/network-request-failed': 'Network error. Check your connection.',
    };
    return map[code] ?? 'Registration failed. Please try again.';
  }

  goToLogin() { this.router.navigateByUrl('/auth/login'); }
}