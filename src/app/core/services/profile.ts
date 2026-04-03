import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  avatarUrl: string | null = null;
  location = '';
}
