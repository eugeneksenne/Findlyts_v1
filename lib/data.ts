import { Club, FlashDrop, UserSuggestion, Category } from './types';

// Dummy data - will be replaced with Supabase queries
export const FLASH_DROPS: FlashDrop[] = [
  {
    id: 'f1',
    title: 'Free Entry Before 11PM',
    club: 'The Vault',
    distance: '1.2km',
    vibe: 'High Vibe',
    timeLeft: '27 min left',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=600&q=80',
    destination: { lat: -26.205, lng: 28.043 },
  },
  {
    id: 'f2',
    title: '2-for-1 Drinks',
    club: 'Taboo',
    distance: '3.4km',
    vibe: 'Trending',
    timeLeft: '1h 5m left',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    destination: { lat: -26.18, lng: 28.03 },
  }
];

export const TRENDING_CLUBS: Club[] = [
  {
    id: 'c1',
    name: 'The Vault',
    distance: '1.2km away',
    vibeScore: '98%',
    isLive: true,
    viewers: 124,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1080&auto=format&fit=crop',
    tags: ['Techno', 'Underground']
  },
  // ... more clubs
];

export const PEOPLE_SUGGESTIONS: UserSuggestion[] = [
  { id: 'p1', name: 'Zinhle', mutuals: 12, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&fit=crop' },
  // ...
];

export const CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Rooftops', image: 'https://images.unsplash.com/photo-1572535091724-69974cdeb98f?q=80&w=400&fit=crop' },
  // ...
];