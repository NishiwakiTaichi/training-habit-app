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
      className="min-h-screen flex items-center justify-center p-8"
      style={{ background: '#F2F7F3' }}
    >
      <div
        className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn"
        style={{ border: '3px solid #6FBF8E' }}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* 左側：テキストと天気情報 */}
          <div
            className="p-12 flex flex-col justify-center"
            style={{ background: 'linear-gradient(135deg, #F2F7F3 0%, #FFFFFF 100%)' }}
          >
            <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <h1
                className="text-4xl font-black mb-8"
                style={{ color: '#2D5F3F', lineHeight: '1.4' }}
              >
                今日のトレーニングを<br />始めましょう！
              </h1>
            </div>

            <WeatherCard
              weather={weather}
              onLocationChange={onLocationChange}
            />

            <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <Button
                variant="primary"
                onClick={onStart}
                className="w-full"
              >
                始める
              </Button>
            </div>
          </div>

          {/* 右側：イラスト（または画像） */}
          <div
            className="relative p-12 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #E8F5ED 0%, #F2F7F3 100%)' }}
          >
            <div className="illustration-container">
              {/* トップ画面用の画像 */}
              <div className="relative animate-float">
                <img
                  src="/images/top-screen.png"
                  alt="トレーニングイラスト"
                  style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
