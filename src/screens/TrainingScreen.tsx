import React from 'react';
import { ChevronLeft, Calendar } from 'lucide-react';
import Button from '../components/Button';
import { TrainingMenu } from '../types';

interface TrainingScreenProps {
  menus: TrainingMenu[];
  currentIndex: number;
  onClear: () => void;
  onBack: () => void;
  onCalendar: () => void;
  onMenuSelect: (index: number) => void;
}

/**
 * トレーニング実行画面
 */
const TrainingScreen: React.FC<TrainingScreenProps> = ({
  menus,
  currentIndex,
  onClear,
  onBack,
  onCalendar,
  onMenuSelect
}) => {
  const currentMenu = menus[currentIndex];

  if (!currentMenu) {
    return (
      <div className="min-h-screen p-8" style={{ background: '#F2F7F3' }}>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <h2 className="text-3xl font-black mb-4" style={{ color: '#2D5F3F' }}>
              今日のメニューはありません
            </h2>
            <Button variant="secondary" onClick={onBack} icon={<ChevronLeft size={24} />}>
              戻る
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ background: '#F2F7F3' }}>
      <div className="max-w-6xl mx-auto">
        <div
          className="bg-white rounded-3xl shadow-2xl p-12 animate-scaleIn"
          style={{ border: '3px solid #6FBF8E' }}
        >
          <h2
            className="text-3xl font-black mb-8 text-center"
            style={{ color: '#2D5F3F' }}
          >
            今日のトレーニング
          </h2>

          {/* メニュータブ */}
          <div className="flex gap-4 mb-8 justify-center flex-wrap">
            {menus.map((menu, idx) => (
              <button
                key={idx}
                onClick={() => onMenuSelect(idx)}
                className={`px-6 py-3 rounded-full font-bold transition-all ${idx === currentIndex
                    ? 'text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 border-2 hover:border-opacity-80'
                  }`}
                style={{
                  background: idx === currentIndex ? '#6FBF8E' : 'white',
                  borderColor: '#6FBF8E'
                }}
              >
                {menu.name}
              </button>
            ))}
          </div>

          {/* 現在の種目表示 */}
          <div
            className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-12 mb-8 border-3"
            style={{ border: '3px solid #E8F5ED' }}
          >
            {/* トレーニング画像 */}
            <div className="flex justify-center mb-8">
              {currentMenu.image ? (
                <img
                  src={currentMenu.image}
                  alt={currentMenu.name}
                  className="animate-float"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    borderRadius: '16px'
                  }}
                />
              ) : (
                <div className="w-96 h-64 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-8xl animate-float">{currentMenu.emoji}</div>
                  <svg className="absolute bottom-0 w-full" viewBox="0 0 400 100">
                    <path
                      d="M 0 50 Q 100 30 200 50 T 400 50 L 400 100 L 0 100 Z"
                      fill="#6FBF8E"
                      opacity="0.2"
                    />
                  </svg>
                </div>
              )}
            </div>

            <h3
              className="text-4xl font-black text-center mb-4"
              style={{ color: '#2D5F3F' }}
            >
              {currentMenu.name}
            </h3>
            <p
              className="text-3xl text-center font-bold"
              style={{ color: '#6FBF8E' }}
            >
              ×{currentMenu.reps}{currentMenu.unit} × {currentMenu.sets}セット
            </p>
            <p className="text-center text-gray-500 mt-4 text-lg">
              {currentIndex + 1}/{menus.length}
            </p>
          </div>

          {/* ボタン群 */}
          <div className="flex gap-4 justify-between">
            <Button
              variant="secondary"
              onClick={onBack}
              icon={<ChevronLeft size={24} />}
              className="px-8 py-4 text-lg"
            >
              戻る
            </Button>

            <Button
              variant="primary"
              onClick={onClear}
              className="flex-1 text-xl"
            >
              Clear !
            </Button>

            <Button
              variant="secondary"
              onClick={onCalendar}
              icon={<Calendar size={24} />}
              className="px-8 py-4 text-lg"
            >
              カレンダー
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingScreen;
