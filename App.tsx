import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Info } from 'lucide-react';
import { Profile } from './types';
import { BACKGROUND_IMAGES } from './constants';
import SakuraCard from './components/SakuraCard';
import CreateModal from './components/CreateModal';
import DetailModal from './components/DetailModal';

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [bgImage, setBgImage] = useState<string | null>(null);

  // Load profiles and set background on mount
  useEffect(() => {
    // Set random background image
    setBgImage(BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)]);

    const stored = localStorage.getItem('sakura_connect_profiles');
    if (stored) {
      try {
        const parsedProfiles = JSON.parse(stored);
        // リロード時にすべてのカードが同時に降ってこないよう、delayを再計算して散らばらせる
        const scatteredProfiles = parsedProfiles.map((p: Profile) => ({
          ...p,
          animDelay: -(Math.random() * p.animDuration)
        }));
        setProfiles(scatteredProfiles);
      } catch (e) {
        console.error("Failed to parse stored profiles", e);
        setProfiles([]);
      }
    } else {
      setProfiles([]);
    }
    
    // Hide info toast after 5 seconds
    const timer = setTimeout(() => setShowInfo(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateProfile = useCallback((newProfileData: Omit<Profile, 'id' | 'createdAt' | 'animDuration' | 'animDelay' | 'animLeft' | 'animSwayDuration'>) => {
    setProfiles(prev => {
      // 重なりを防ぐためのレーン計算 (画面を3分割して配置)
      const lane = prev.length % 3;
      // レーンごとのベース位置 (vw)
      const baseLeft = lane * 30 + 5; 
      // 少しランダムにずらす (-5vw ~ +5vw)
      let animLeft = baseLeft + (Math.random() * 10 - 5);
      // 画面外にはみ出さないようにクランプ (カード幅が約30vwなので、最大68vw程度に)
      animLeft = Math.max(2, Math.min(animLeft, 68));

      const newProfile: Profile = {
        ...newProfileData,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: Date.now(),
        // 落下速度: 20s ~ 35s (少し速くして動きを出す)
        animDuration: Math.random() * 15 + 20, 
        // 新規作成時はすぐに上から降ってくるように delay を 0 にする
        animDelay: 0, 
        animLeft: animLeft,
        // 揺れの速度: 2.5s ~ 4.5s (ひらひら感を出すために短くする)
        animSwayDuration: Math.random() * 2 + 2.5, 
      };

      const updated = [...prev, newProfile];
      localStorage.setItem('sakura_connect_profiles', JSON.stringify(updated));
      return updated;
    });
    setIsCreateModalOpen(false);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-pink-50">
      
      {/* Blurred Background Image */}
      {bgImage && (
        <div 
          // -inset-8 と scale-110 で画面より確実に大きくし、ぼかしによる端の余白（白浮き）を完全に防ぐ
          className="absolute -inset-8 bg-cover bg-center scale-110 transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url('${bgImage}')`, 
            filter: 'blur(6px) brightness(0.95)', // 軽くぼかしを入れる
          }}
        />
      )}
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/30 mix-blend-overlay pointer-events-none"></div>

      {/* Header / Controls */}
      <header className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start z-40 pointer-events-none">
        <div className="pointer-events-auto bg-white/60 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-white/50">
          <h1 className="text-2xl md:text-3xl font-black text-pink-600 drop-shadow-sm flex items-center gap-2">
            Sakura Connect <span className="text-3xl">🌸</span>
          </h1>
          <p className="text-sm text-pink-800/80 font-bold mt-1 ml-1">新入生歓迎！自己紹介を共有しよう</p>
        </div>
        
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-pink-50 text-pink-600 border-2 border-pink-300 font-bold py-3 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <PlusCircle size={24} />
          <span className="hidden md:inline text-lg">自己紹介を書く</span>
          <span className="md:hidden text-lg">書く</span>
        </button>
      </header>

      {/* Info Toast */}
      {showInfo && profiles.length > 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border-2 border-pink-200 flex items-center gap-3 text-gray-700 font-medium">
            <Info size={20} className="text-pink-500" />
            降ってくる桜の花をクリックしてプロフィールを見てみよう！
          </div>
        </div>
      )}

      {/* Empty State Hint */}
      {profiles.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="bg-white/80 backdrop-blur-md px-8 py-6 rounded-3xl shadow-lg border border-pink-200 text-center animate-pulse">
            <p className="text-xl font-bold text-pink-600 mb-2">まだ誰もいません 🌸</p>
            <p className="text-gray-600">右上のボタンから最初の自己紹介を書いてみよう！</p>
          </div>
        </div>
      )}

      {/* Falling Cards Container */}
      <main className="absolute inset-0 pointer-events-none overflow-hidden">
        {profiles.map(profile => (
          <SakuraCard
            key={profile.id}
            profile={profile}
            onClick={setSelectedProfile}
          />
        ))}
      </main>

      {/* Modals */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProfile}
      />

      <DetailModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
};

export default App;
