import React, { useState } from 'react';
import { X } from 'lucide-react';
import { GRADES, MBTI_TYPES } from '../constants';
import { Profile } from '../types';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profile: Omit<Profile, 'id' | 'createdAt' | 'animDuration' | 'animDelay' | 'animLeft' | 'animSwayDuration'>) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('1');
  const [mbti, setMbti] = useState('わからない');
  const [hobby, setHobby] = useState('');
  const [message, setMessage] = useState('');
  const [birthplace, setBirthplace] = useState('');
  const [birthday, setBirthday] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [club, setClub] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('必須項目を入力してください。');
      return;
    }
    onSubmit({ 
      name, grade, mbti, hobby, message, 
      birthplace, birthday, twitter, instagram, club 
    });
    // Reset form
    setName(''); setGrade('1'); setMbti('わからない'); setHobby(''); setMessage('');
    setBirthplace(''); setBirthday(''); setTwitter(''); setInstagram(''); setClub('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        <div className="bg-pink-100 p-4 flex justify-between items-center border-b border-pink-200 shrink-0">
          <h2 className="text-xl font-bold text-pink-800 flex items-center gap-2">
            <span>🌸</span> 自己紹介カードを作成
          </h2>
          <button onClick={onClose} className="text-pink-600 hover:text-pink-800 transition-colors rounded-full p-1 hover:bg-pink-200">
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6">
          <form id="profile-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* 必須項目 */}
            <div className="space-y-4 bg-pink-50/50 p-4 rounded-xl border border-pink-100">
              <h3 className="text-sm font-bold text-pink-600 border-b border-pink-200 pb-1">必須項目</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">お名前 (ニックネーム可) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                  placeholder="さくら"
                  maxLength={15}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学年 <span className="text-red-500">*</span></label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all bg-white"
                  >
                    {GRADES.map(g => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">MBTI <span className="text-red-500">*</span></label>
                  <select
                    value={mbti}
                    onChange={(e) => setMbti(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all bg-white"
                  >
                    {MBTI_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 任意項目 */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 border-b border-gray-200 pb-1">任意項目（もっと知ってもらおう！）</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">趣味・好きなこと</label>
                <input
                  type="text"
                  value={hobby}
                  onChange={(e) => setHobby(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                  placeholder="カフェ巡り、ゲーム、読書など"
                  maxLength={30}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ひとことメッセージ</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all resize-none h-20"
                  placeholder="よろしくお願いします！"
                  maxLength={100}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">出身地</label>
                  <input
                    type="text"
                    value={birthplace}
                    onChange={(e) => setBirthplace(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                    placeholder="東京都"
                    maxLength={20}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">誕生日</label>
                  <input
                    type="text"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                    placeholder="4月1日"
                    maxLength={20}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">所属サークル・部活</label>
                <input
                  type="text"
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                  placeholder="軽音サークル"
                  maxLength={30}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">X (Twitter) ID</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">@</span>
                    <input
                      type="text"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value.replace('@', ''))}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                      placeholder="username"
                      maxLength={20}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram ID</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">@</span>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value.replace('@', ''))}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                      placeholder="username"
                      maxLength={30}
                    />
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white shrink-0">
          <button
            type="submit"
            form="profile-form"
            className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            花びらを舞い散らせる 🌸
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateModal;
