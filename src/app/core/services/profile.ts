import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  name      = 'Jane Doe';
  email     = 'jane@example.com';
  location  = 'New York, USA';
  avatarUrl: string | null = null;
}