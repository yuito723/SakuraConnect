export interface Profile {
  id: string;
  name: string;
  grade: string;
  mbti: string;
  hobby: string;
  message: string;
  birthplace?: string;
  birthday?: string;
  twitter?: string;
  instagram?: string;
  club?: string;
  createdAt: number;
  // Animation properties generated once per profile so they don't reset on re-render
  animDuration: number;
  animDelay: number;
  animLeft: number;
  animSwayDuration: number;
}

export type MBTIGroup = 'Analysts' | 'Diplomats' | 'Sentinels' | 'Explorers' | 'Unknown';
