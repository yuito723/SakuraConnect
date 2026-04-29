import React from 'react';
import { X, Heart, MessageCircle, GraduationCap, MapPin, Cake, Users, AtSign } from 'lucide-react';
import { Profile } from '../types';
import { getMBTIColors, GRADES } from '../constants';

interface DetailModalProps {
  profile: Profile | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ profile, onClose }) => {
  if (!profile) return null;

  const colors = getMBTIColors(profile.mbti);
  const gradeLabel = GRADES.find(g => g.value === profile.grade)?.label || profile.grade;
  const isFirstYear = profile.grade === '1';
  const showMbti = profile.mbti !== 'わからない';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border-4 ${colors.border} relative max-h-[90vh] flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {/* Decorative background elements */}
        <div className={`absolute top-0 left-0 w-full h-32 ${colors.bg} opacity-50 rounded-b-[50%] -translate-y-10`}></div>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 bg-white/90 hover:bg-white rounded-full p-1.5 z-[60] transition-all shadow-sm cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="p-6 pt-8 relative z-10 flex flex-col items-center text-center shrink-0">
          
          {/* Avatar / MBTI Badge */}
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white ${colors.bg} ${isFirstYear ? 'ring-4 ring-yellow-300 ring-offset-2' : ''}`}>
            {showMbti ? (
              <span className={`text-2xl font-black ${colors.text}`}>{profile.mbti}</span>
            ) : (
              <span className="text-4xl">🌸</span>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</h2>
          
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${isFirstYear ? 'bg-pink-100 text-pink-700 border border-pink-200' : 'bg-gray-100 text-gray-600'}`}>
              <GraduationCap size={14} />
              {gradeLabel}
            </span>
            {isFirstYear && (
              <span className="animate-bounce text-lg" title="新入生！">🌸</span>
            )}
          </div>
        </div>

        <div className="overflow-y-auto px-6 pb-6 space-y-4 text-left">
          
          {/* Basic Info Grid */}
          {(profile.birthplace || profile.birthday || profile.club) && (
            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              {profile.birthplace && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="truncate">{profile.birthplace}</span>
                </div>
              )}
              {profile.birthday && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Cake size={16} className="text-gray-400" />
                  <span className="truncate">{profile.birthday}</span>
                </div>
              )}
              {profile.club && (
                <div className="flex items-center gap-2 text-sm text-gray-700 col-span-2">
                  <Users size={16} className="text-gray-400 shrink-0" />
                  <span className="truncate">{profile.club}</span>
                </div>
              )}
            </div>
          )}

          {/* SNS Links */}
          {(profile.twitter || profile.instagram) && (
            <div className="flex flex-wrap gap-3">
              {profile.twitter && (
                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">
                  <AtSign size={16} />
                  <span>@{profile.twitter}</span>
                </div>
              )}
              {profile.instagram && (
                <div className="flex items-center gap-1.5 bg-fuchsia-50 text-fuchsia-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-fuchsia-100">
                  <AtSign size={16} />
                  <span>@{profile.instagram}</span>
                </div>
              )}
            </div>
          )}

          {profile.hobby && (
            <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
              <div className="flex items-center gap-2 text-sm font-bold text-pink-600 mb-2">
                <Heart size={16} />
                趣味・好きなこと
              </div>
              <p className="text-gray-800">{profile.hobby}</p>
            </div>
          )}

          {profile.message && (
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-2">
                <MessageCircle size={16} />
                ひとこと
              </div>
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{profile.message}</p>
            </div>
          )}
          
          <div className="mt-4 text-center text-xs text-gray-400">
            {new Date(profile.createdAt).toLocaleDateString('ja-JP')} に参加
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
