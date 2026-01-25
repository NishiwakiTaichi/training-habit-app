import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';
import { WeatherInfo } from '../types';

/**
 * 天気条件のリスト
 */
export const weatherConditions: WeatherInfo[] = [
  {
    icon: Sun,
    text: '晴れ',
    condition: 'おだやか',
    recommend: '屋外の運動がオススメです'
  },
  {
    icon: Cloud,
    text: '曇り',
    condition: 'おだやか',
    recommend: '屋外の運動もオススメです'
  },
  {
    icon: CloudRain,
    text: '雨',
    condition: 'やや強め',
    recommend: '屋内での運動がオススメです'
  },
  {
    icon: Wind,
    text: '風',
    condition: 'やや強め',
    recommend: '屋内での運動がオススメです'
  }
];

/**
 * ランダムな天気を取得する（デモ用）
 * @returns 天気情報オブジェクト
 */
export const getRandomWeather = (): WeatherInfo => {
  const randomIndex = Math.floor(Math.random() * weatherConditions.length);
  return weatherConditions[randomIndex];
};

/**
 * 天気APIから実際の天気情報を取得する（将来の実装用）
 * @param location - 地域名
 * @returns 天気情報オブジェクト
 */
export const fetchWeather = async (location: string): Promise<WeatherInfo> => {
  // TODO: 実際のAPIとの連携を実装
  // 例：OpenWeatherMap API, 気象庁API など
  console.log('Fetching weather for:', location);

  // 現在はランダムな天気を返す
  return getRandomWeather();
};
