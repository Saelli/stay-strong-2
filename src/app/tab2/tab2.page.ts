import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [CommonModule, IonContent],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  selectedPlan: 'silver' | 'gold' = 'gold';

  constructor(private router: Router) {}

  selectPlan(plan: 'silver' | 'gold') {
    this.selectedPlan = plan;
  }

  onContinue() {
    this.router.navigateByUrl('/store-checkout?plan=' + this.selectedPlan);
  }
}