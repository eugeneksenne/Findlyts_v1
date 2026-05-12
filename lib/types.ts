export interface Club {
  id: string;
  name: string;
  distance?: string;
  vibeScore?: string;
  isLive?: boolean;
  viewers?: number;
  moments?: number;
  image: string;
  tags: string[];
  address?: string;
  lat?: number;
  lng?: number;
}

export interface FlashDrop {
  id: string;
  title: string;
  club: string;
  distance: string;
  vibe: string;
  timeLeft: string;
  image: string;
  destination?: { lat: number; lng: number };
}

export interface UserSuggestion {
  id: string;
  name: string;
  mutuals: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: any;
};