import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonButton, IonInput, IonItem,
  IonText, IonSpinner, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { flashOutline, logoGoogle } from 'ionicons/icons';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonButton, IonInput,
    IonItem, IonText, IonSpinner, IonIcon
  ]
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = false;
  error = '';

  constructor() {
    addIcons({ flashOutline, logoGoogle });
  }

  async onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }
    this.error = '';
    this.loading = true;
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    } catch (e: any) {
      this.error = e.message || e.code || 'Login failed';
    } finally {
      this.loading = false;
    }
  }

  async onGoogleLogin() {
    this.error = '';
    try {
      await this.authService.loginWithGoogle();
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    } catch (e: any) {
      this.error = e.message || 'Google login failed';
    }
  }

  goToRegister() { this.router.navigateByUrl('/auth/register'); }
  goToForgot()   { this.router.navigateByUrl('/auth/forgot-password'); }
}
