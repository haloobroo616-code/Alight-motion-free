export type PageType = 'home' | 'dashboard' | 'tools' | 'admin';

export interface UserAccount {
  email: string;
  plan: string;
  activatedAt: string;
  expiresAt: string;
  status: 'active' | 'pending' | 'expired';
  activationsCount: number;
}

export interface BroadcastMessage {
  id: number;
  admin: string;
  verified: boolean;
  emoji: string;
  message: string;
  createdAt: string;
}

export interface ToolItem {
  id: string;
  title: string;
  category: 'Preset' | 'XML' | 'Speed' | 'Effect';
  description: string;
  downloads: number;
  rating: number;
  tag: string;
}
