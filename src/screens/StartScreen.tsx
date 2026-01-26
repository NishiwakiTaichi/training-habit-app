import React from 'react';
import Button from '../components/Button';
import WeatherCard from '../components/WeatherCard';
import { WeatherInfo } from '../types';

interface StartScreenProps {
  weather: WeatherInfo;
  onStart: () => void;
  onLocationChange?: (location: string) => void;
}

/**
 * スタート画面
 */
const StartScreen: React.FC<StartScreenProps> = ({ weather, onStart, onLocationChange }) => {
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
          maxWidth: '1200px',
          background: '#FEFEFE',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {/* 左側：タイトル、天気情報、ボタン */}
          <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: 900,
                color: '#2D5F3F',
                lineHeight: '1.4',
                marginBottom: '32px'
              }}
            >
              今日のトレーニングを<br />始めましょう！
            </h1>

            <WeatherCard
              weather={weather}
              onLocationChange={onLocationChange}
            />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="primary"
                onClick={onStart}
                style={{ width: '100%', maxWidth: '350px', fontSize: '20px', padding: '18px 48px' }}
              >
                始める
              </Button>
            </div>
          </div>

          {/* 右側：イラスト */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px',
              background: 'linear-gradient(135deg, #E8F5ED 0%, #F2F7F3 100%)'
            }}
          >
            <img
              src="/images/top-screen.png"
              alt="トレーニングイラスト"
              style={{ width: '100%', maxWidth: '450px', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
