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
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          background: '#F2F7F3'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1000px',
            background: '#FEFEFE',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            padding: '48px',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#2D5F3F', marginBottom: '16px' }}>
            今日のメニューはありません
          </h2>
          <Button variant="secondary" onClick={onBack} icon={<ChevronLeft size={24} />}>
            戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        background: '#F2F7F3'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          background: '#FEFEFE',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          padding: '48px'
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 900,
            color: '#2D5F3F',
            marginBottom: '32px',
            textAlign: 'center'
          }}
        >
          今日のトレーニング
        </h2>

        {/* メニュータブ */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {menus.map((menu, idx) => (
            <button
              key={idx}
              onClick={() => onMenuSelect(idx)}
              style={{
                background: idx === currentIndex ? '#6FBF8E' : 'white',
                border: `2px solid ${idx === currentIndex ? '#6FBF8E' : '#E8F5ED'}`,
                borderRadius: '14px',
                color: idx === currentIndex ? 'white' : '#6FBF8E',
                cursor: 'pointer',
                padding: '10px 24px',
                fontSize: '16px',
                fontWeight: 700,
                transition: 'all 0.3s ease'
              }}
            >
              {` ${menu.name} `}
            </button>
          ))}
        </div>

        {/* 現在の種目表示 */}
        <div
          style={{
            border: '3px solid #E8F5ED',
            background: 'linear-gradient(135deg, #F2F7F3 0%, white 100%)',
            borderRadius: '24px',
            padding: '48px',
            marginBottom: '32px'
          }}
        >
          {/* トレーニング画像 */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            {currentMenu.image ? (
              <img
                src={currentMenu.image}
                alt={currentMenu.name}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  borderRadius: '16px',
                  border: '3px solid #E8F5ED'
                }}
              />
            ) : (
              <div style={{ fontSize: '96px' }}>{currentMenu.emoji}</div>
            )}
          </div>

          <h3
            style={{
              fontSize: '28px',
              fontWeight: 900,
              color: '#2D5F3F',
              textAlign: 'center',
              marginBottom: '12px'
            }}
          >
            {currentMenu.name}
          </h3>
          <p
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#6FBF8E',
              textAlign: 'center',
              marginBottom: '12px'
            }}
          >
            ×{currentMenu.reps}{currentMenu.unit}
          </p>
          <p style={{ textAlign: 'center', color: '#999', fontSize: '14px' }}>
            {currentIndex + 1}/{menus.length}
          </p>
        </div>

        {/* ボタン群 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '32px', paddingRight: '32px' }}>
          <Button
            variant="secondary"
            onClick={onBack}
            icon={<ChevronLeft size={16} />}
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            戻る
          </Button>

          <Button
            variant="primary"
            onClick={onClear}
            style={{ padding: '12px 40px', fontSize: '18px' }}
          >
            Clear !
          </Button>

          <Button
            variant="secondary"
            onClick={onCalendar}
            icon={<Calendar size={16} />}
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            カレンダー
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainingScreen;
