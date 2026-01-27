import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { WeatherInfo } from '../types';

interface WeatherCardProps {
  weather: WeatherInfo;
  onLocationChange?: (location: string) => void;
}

/**
 * 天気情報を表示するカードコンポーネント
 */
const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onLocationChange }) => {
  const [location, setLocation] = useState<string>('');
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const WeatherIcon = weather.icon;

  // 初回マウント時に保存された地域を読み込む
  React.useEffect(() => {
    const savedLocation = localStorage.getItem('training-app-location');
    if (savedLocation) {
      setLocation(savedLocation);
    } else {
      setLocation('東京');
    }
  }, []);

  const handleSearch = async (): Promise<void> => {
    if (!location.trim()) {
      alert('地域名を入力してください');
      return;
    }

    setIsSearching(true);

    // 地域を保存
    localStorage.setItem('training-app-location', location);

    if (onLocationChange) {
      await onLocationChange(location);
    }

    setIsSearching(false);
  };

  /**
   * 現在地を取得
   */
  const handleGetCurrentLocation = (): void => {
    setIsGettingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationText = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
          setLocation(locationText);

          // 現在地を保存
          localStorage.setItem('training-app-location', locationText);

          if (onLocationChange) {
            await onLocationChange(locationText);
          }

          setIsGettingLocation(false);
        },
        (error) => {
          console.error('位置情報の取得に失敗しました:', error);
          alert('位置情報の取得に失敗しました。ブラウザの設定を確認してください。');
          setIsGettingLocation(false);
        }
      );
    } else {
      alert('このブラウザは位置情報に対応していません');
      setIsGettingLocation(false);
    }
  };

  return (
    <div
      style={{
        border: '2px solid #E8F5ED',
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px'
      }}
    >
      <h3 style={{ fontWeight: 700, fontSize: '18px', color: '#2D5F3F', marginBottom: '16px' }}>
        今日の天気
      </h3>

      {/* 現在地を使うボタン */}
      <button
        onClick={handleGetCurrentLocation}
        disabled={isGettingLocation}
        style={{
          width: '100%',
          marginBottom: '12px',
          padding: '12px 16px',
          borderRadius: '8px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: '#E8F5ED',
          color: '#2D5F3F',
          border: 'none',
          cursor: isGettingLocation ? 'not-allowed' : 'pointer',
          opacity: isGettingLocation ? 0.6 : 1
        }}
      >
        <MapPin size={20} />
        {isGettingLocation ? '取得中...' : '現在地を使う'}
      </button>

      {/* 検索フィールド */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder="地域名（例：名古屋/東京/Tokyo）"
          disabled={isSearching}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '2px solid #E8F5ED',
            borderRadius: '8px',
            fontSize: '14px',
            background: '#F9FCFA'
          }}
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 500,
            fontSize: '14px',
            background: '#2D5F3F',
            color: 'white',
            border: 'none',
            cursor: isSearching ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            opacity: isSearching ? 0.6 : 1
          }}
        >
          {isSearching ? '検索中...' : '検索'}
        </button>
      </div>

      {/* 天気情報 */}
      <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
        <WeatherIcon size={32} style={{ color: '#6FBF8E', flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '16px', color: '#2D5F3F', marginBottom: '4px' }}>
            天気 ☀️ 風：{weather.condition}
          </div>
          <div style={{ fontSize: '14px', color: '#5DAD7C' }}>
            {weather.recommend}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
