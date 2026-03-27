import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoriteIds: Set<string> = new Set();

  isFavorite(id: string): boolean {
    return this.favoriteIds.has(id);
  }

  toggle(id: string): void {
    if (this.favoriteIds.has(id)) {
      this.favoriteIds.delete(id);
    } else {
      this.favoriteIds.add(id);
    }
  }

  getIds(): string[] {
    return Array.from(this.favoriteIds);
  }
}