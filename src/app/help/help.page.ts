import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  chevronDownOutline, chevronUpOutline,
  mailOutline, logoInstagram, informationCircleOutline
} from 'ionicons/icons';

interface FAQ {
  q: string;
  a: string;
  open: boolean;
}

@Component({
  selector: 'app-help',
  templateUrl: 'help.page.html',
  styleUrls: ['help.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon,
  ],
})
export class HelpPage {
  // Contact form
  name    = '';
  email   = '';
  message = '';
  sent    = false;

  faqs: FAQ[] = [
    {
      q: 'How do I access premium workouts?',
      a: 'Go to the Store tab and choose a Silver or Gold plan. After subscribing, all premium workouts unlock immediately.',
      open: false,
    },
    {
      q: 'Can I cancel my subscription?',
      a: 'Yes. Go to Profile → Subscription and tap "Cancel Subscription". You will keep access until the end of your billing period.',
      open: false,
    },
    {
      q: 'Why is a video not playing?',
      a: 'Make sure you have a stable internet connection. Some videos require a premium subscription — look for the lock icon.',
      open: false,
    },
    {
      q: 'How do I save a workout to favorites?',
      a: 'Tap the heart icon on any video card on the Home screen, or tap the heart in the top right corner of the video player.',
      open: false,
    },
    {
      q: 'How do I change my profile photo?',
      a: 'Go to Profile → Settings and tap the camera icon on your avatar to upload a new photo.',
      open: false,
    },
    {
      q: 'Is my payment information secure?',
      a: 'Yes. All payments are processed securely. We never store your card details on our servers.',
      open: false,
    },
  ];

  constructor() {
    addIcons({ chevronDownOutline, chevronUpOutline, mailOutline, logoInstagram, informationCircleOutline });
  }

  toggleFaq(faq: FAQ) {
    faq.open = !faq.open;
  }

  submitForm() {
    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) return;
    this.sent = true;
    this.name = '';
    this.email = '';
    this.message = '';
    setTimeout(() => this.sent = false, 4000);
  }
}
