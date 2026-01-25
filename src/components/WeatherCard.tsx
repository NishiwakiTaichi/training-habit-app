import React, { useState } from 'react';
import { WeatherInfo } from '../types';

interface WeatherCardProps {
  weather: WeatherInfo;
  onLocationChange?: (location: string) => void;
}

/**
 * 天気情報を表示するカードコンポーネント
 */
const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onLocationChange }) => {
  const [location, setLocation] = useState<string>('東京');
  const WeatherIcon = weather.icon;

  const handleSearch = (): void => {
    if (onLocationChange) {
      onLocationChange(location);
    }
  };

  return (
    <div className="weather-card mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
      <h3 className="font-bold text-lg mb-4" style={{ color: '#2D5F3F' }}>
        今日の天気
      </h3>

      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="地域名（例：名古屋/東京/Shinjuku）"
          className="flex-1 px-4 py-2 border-2 rounded-lg text-sm"
          style={{ borderColor: '#E8F5ED', background: '#F9FCFA' }}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-lg font-medium text-sm"
          style={{ background: '#6FBF8E', color: 'white' }}
        >
          検索
        </button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <WeatherIcon size={40} style={{ color: '#6FBF8E' }} />
        <div>
          <div className="font-bold text-xl" style={{ color: '#2D5F3F' }}>
            天気 {weather.text}　風：{weather.condition}
          </div>
          <div className="text-base mt-1" style={{ color: '#5DAD7C' }}>
            {weather.recommend}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
