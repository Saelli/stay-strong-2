import { Injectable } from '@angular/core';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  vimeoId: string;
  locked: boolean;
  duration: string;
  category: string;
  description: string;
}

export interface Playlist {
  id: string;
  title: string;
  videos: Video[];
}

const ALL_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Morning Warm Up',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    videoUrl: 'https://player.vimeo.com/video/393848182',
    vimeoId: '393848182',
    locked: false,
    duration: '5:00',
    category: 'Beginner',
    description: 'Start your day right with this energizing morning warm-up routine. Perfect for all fitness levels.',
  },
  {
    id: '2',
    title: 'Yoga Flow',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    videoUrl: 'https://player.vimeo.com/video/393849358',
    vimeoId: '393849358',
    locked: false,
    duration: '8:00',
    category: 'Yoga',
    description: 'A calming yoga flow to improve flexibility and mindfulness. Free for all users.',
  },
  {
    id: '3',
    title: 'Core Strength',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    videoUrl: 'https://player.vimeo.com/video/393831964',
    vimeoId: '393831964',
    locked: true,
    duration: '12:00',
    category: 'Strength',
    description: 'Build a stronger core with this intense workout targeting abs, obliques and lower back.',
  },
  {
    id: '4',
    title: 'HIIT Burn',
    thumbnail: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80',
    videoUrl: 'https://player.vimeo.com/video/393854783',
    vimeoId: '393854783',
    locked: true,
    duration: '20:00',
    category: 'Cardio',
    description: 'High intensity interval training to torch calories and boost your metabolism.',
  },
  {
    id: '5',
    title: 'Full Body Power',
    thumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    videoUrl: 'https://player.vimeo.com/video/393848182',
    vimeoId: '393848182',
    locked: true,
    duration: '25:00',
    category: 'Strength',
    description: 'A complete full body strength workout for maximum muscle engagement and growth.',
  },
];

@Injectable({ providedIn: 'root' })
export class VideoService {

  list(): Video[] { return ALL_VIDEOS; }

  getById(id: string): Video | undefined {
    return ALL_VIDEOS.find(v => v.id === id);
  }

  getFree(): Video[] {
    return ALL_VIDEOS.filter(v => !v.locked);
  }

  getPlaylists(): Playlist[] {
    return [
      { id: 'free',     title: '🆓 Free Workouts',    videos: ALL_VIDEOS.filter(v => !v.locked) },
      { id: 'strength', title: '💪 Strength Training', videos: ALL_VIDEOS.filter(v => v.category === 'Strength') },
      { id: 'cardio',   title: '🔥 Cardio & HIIT',     videos: ALL_VIDEOS.filter(v => v.category === 'Cardio') },
      { id: 'yoga',     title: '🧘 Yoga & Mobility',   videos: ALL_VIDEOS.filter(v => v.category === 'Yoga') },
    ];
  }
}