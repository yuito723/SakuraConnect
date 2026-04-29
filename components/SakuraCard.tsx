import React from 'react';
import { Profile } from '../types';
import { getMBTIColors } from '../constants';

interface SakuraCardProps {
  profile: Profile;
  onClick: (profile: Profile) => void;
}

const SakuraCard: React.FC<SakuraCardProps> = ({ profile, onClick }) => {
  const colors = getMBTIColors(profile.mbti);
  const isFirstYear = profile.grade === '1';
  const showMbti = profile.mbti !== 'わからない';

  return (
    <div
      className="sakura-container cursor-pointer pointer-events-auto w-[30vw] max-w-[300px] min-w-[150px]"
      style={{
        left: `${profile.animLeft}vw`,
        animationDuration: `${profile.animDuration}s`,
        animationDelay: `${profile.animDelay}s`,
      }}
      onClick={() => onClick(profile)}
    >
      <div
        className={`sakura-sway relative flex items-center justify-center transition-transform hover:scale-110 ${isFirstYear ? 'first-year-glow' : 'drop-shadow-xl'}`}
        style={{ animationDuration: `${profile.animSwayDuration}s` }}
      >
        {/* 5-Petal Plump Sakura Flower SVG Background */}
        <svg
          viewBox="0 0 200 200"
          className={`w-full h-auto ${colors.fill} drop-shadow-md`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor">
            {/* 5 Plump Petals rotated around the center (100, 100) */}
            <path d="M100,100 C60,40 65,-10 95,10 Q100,15 100,15 Q100,15 105,10 C135,-10 140,40 100,100 Z" />
            <path d="M100,100 C60,40 65,-10 95,10 Q100,15 100,15 Q100,15 105,10 C135,-10 140,40 100,100 Z" transform="rotate(72 100 100)" />
            <path d="M100,100 C60,40 65,-10 95,10 Q100,15 100,15 Q100,15 105,10 C135,-10 140,40 100,100 Z" transform="rotate(144 100 100)" />
            <path d="M100,100 C60,40 65,-10 95,10 Q100,15 100,15 Q100,15 105,10 C135,-10 140,40 100,100 Z" transform="rotate(216 100 100)" />
            <path d="M100,100 C60,40 65,-10 95,10 Q100,15 100,15 Q100,15 105,10 C135,-10 140,40 100,100 Z" transform="rotate(288 100 100)" />
            {/* Center highlight */}
            <circle cx="100" cy="100" r="25" fill="rgba(255,255,255,0.4)" />
          </g>
        </svg>

        {/* Content Overlay - Centered in the flower */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-[20%] text-center">
          {showMbti && (
            <span 
              className={`font-black px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm mb-1 ${colors.text}`}
              style={{ fontSize: 'clamp(0.6rem, 1.5vw, 1rem)' }}
            >
              {profile.mbti}
            </span>
          )}
          <span 
            className={`font-bold truncate w-full px-2 ${colors.text}`} 
            style={{ 
              fontSize: 'clamp(0.8rem, 2.5vw, 1.5rem)',
              textShadow: '0 1px 3px rgba(255,255,255,0.9)' 
            }}
          >
            {profile.name}
          </span>
          {isFirstYear && (
            <span 
              className="font-black text-pink-600 mt-1 bg-white/90 px-2 py-0.5 rounded-md shadow-sm"
              style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.8rem)' }}
            >
              新入生🌸
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SakuraCard;
