export interface Club {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  image: string;
  isLive: boolean;
  crowdLevel: 'low' | 'medium' | 'high';
  musicGenres: string[];
}

export interface FlashDrop {
  id: string;
  clubId: string;
  title: string;
  description: string;
  expiresIn: number;
  discount: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}