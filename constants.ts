import { MBTIGroup } from './types';

export const GRADES = [
  { value: '1', label: '1年生 (新入生)' },
  { value: '2', label: '2年生' },
  { value: '3', label: '3年生' },
  { value: '4', label: '4年生' },
  { value: 'other', label: 'その他 (院生・教員など)' },
];

export const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP', // Analysts
  'INFJ', 'INFP', 'ENFJ', 'ENFP', // Diplomats
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', // Sentinels
  'ISTP', 'ISFP', 'ESTP', 'ESFP', // Explorers
  'わからない' // Unknown
];

export const getMBTIGroup = (mbti: string): MBTIGroup => {
  if (['INTJ', 'INTP', 'ENTJ', 'ENTP'].includes(mbti)) return 'Analysts';
  if (['INFJ', 'INFP', 'ENFJ', 'ENFP'].includes(mbti)) return 'Diplomats';
  if (['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'].includes(mbti)) return 'Sentinels';
  if (['ISTP', 'ISFP', 'ESTP', 'ESFP'].includes(mbti)) return 'Explorers';
  return 'Unknown';
};

export const getMBTIColors = (mbti: string) => {
  const group = getMBTIGroup(mbti);
  switch (group) {
    case 'Analysts':
      return { fill: 'text-purple-200', text: 'text-purple-900', border: 'border-purple-300', bg: 'bg-purple-50' };
    case 'Diplomats':
      return { fill: 'text-green-200', text: 'text-green-900', border: 'border-green-300', bg: 'bg-green-50' };
    case 'Sentinels':
      return { fill: 'text-blue-200', text: 'text-blue-900', border: 'border-blue-300', bg: 'bg-blue-50' };
    case 'Explorers':
      return { fill: 'text-orange-200', text: 'text-orange-900', border: 'border-orange-300', bg: 'bg-orange-50' };
    case 'Unknown':
    default:
      return { fill: 'text-pink-200', text: 'text-pink-900', border: 'border-pink-300', bg: 'bg-pink-50' };
  }
};

// 指定された5つの画像をランダム背景として使用
export const BACKGROUND_IMAGES = [
  'https://yuito723.conohawing.com/bk%20(1).jpg',
  'https://yuito723.conohawing.com/bk%20(2).jpg',
  'https://yuito723.conohawing.com/bk%20(3).jpg',
  'https://yuito723.conohawing.com/bk%20(4).jpg',
  'https://yuito723.conohawing.com/bk%20(5).jpg'
];
