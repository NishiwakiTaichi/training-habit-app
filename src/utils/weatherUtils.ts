import { Wind, Cloud, CloudRain, Sun } from 'lucide-react';
import { WeatherInfo } from '../types';

/**
 * WeatherAPI.comから天気情報を取得
 * api/weather.ts（サーバー側）を経由してAPIキーを隠す
 */
export const fetchWeather = async (location: string): Promise<WeatherInfo | null> => {
  try {
    // サーバー側のAPIエンドポイントにリクエストを送る
    const response = await fetch(`/api/weather?q=${encodeURIComponent(location)}`);

    if (!response.ok) {
      throw new Error('天気情報の取得に失敗しました');
    }

    const data = await response.json();

    // 風の強さを判定
    const windSpeed = data.current.wind_kph;
    let windCondition = 'おだやか';
    if (windSpeed > 20) {
      windCondition = '強め';
    } else if (windSpeed > 10) {
      windCondition = 'やや強め';
    }

    // 天気アイコンを決定
    let icon = Sun;
    const weatherCode = data.current.condition.code;

    // 雨関連
    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(weatherCode)) {
      icon = CloudRain;
    }
    // 曇り関連
    else if ([1006, 1009].includes(weatherCode)) {
      icon = Cloud;
    }
    // 晴れ
    else {
      icon = Sun;
    }

    // 運動推奨メッセージ
    let recommend = '屋外での運動もオススメです';
    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(weatherCode)) {
      recommend = '屋内での運動がオススメです';
    } else if (windSpeed > 15) {
      recommend = '風が強いので屋内での運動がオススメです';
    }

    return {
      icon,
      text: data.current.condition.text,
      condition: windCondition,
      recommend,
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
};

/**
 * 緯度経度から天気情報を取得
 */
export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherInfo | null> => {
  try {
    // サーバー側のAPIエンドポイントに緯度経度を送る
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

    if (!response.ok) {
      throw new Error('天気情報の取得に失敗しました');
    }

    const data = await response.json();

    // 風の強さを判定
    const windSpeed = data.current.wind_kph;
    let windCondition = 'おだやか';
    if (windSpeed > 20) {
      windCondition = '強め';
    } else if (windSpeed > 10) {
      windCondition = 'やや強め';
    }

    // 天気アイコンを決定
    let icon = Sun;
    const weatherCode = data.current.condition.code;

    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(weatherCode)) {
      icon = CloudRain;
    } else if ([1006, 1009].includes(weatherCode)) {
      icon = Cloud;
    } else {
      icon = Sun;
    }

    let recommend = '屋外での運動もオススメです';
    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(weatherCode)) {
      recommend = '屋内での運動がオススメです';
    } else if (windSpeed > 15) {
      recommend = '風が強いので屋内での運動がオススメです';
    }

    return {
      icon,
      text: data.current.condition.text,
      condition: windCondition,
      recommend,
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
};

/**
 * ランダムな天気を取得する（フォールバック用）
 */
export const getRandomWeather = (): WeatherInfo => {
  const weatherConditions: WeatherInfo[] = [
    {
      icon: Sun,
      text: '晴れ',
      condition: 'おだやか',
      recommend: '屋外での運動もオススメです',
    },
    {
      icon: Cloud,
      text: '曇り',
      condition: 'やや強め',
      recommend: '屋内での運動がオススメです',
    },
    {
      icon: CloudRain,
      text: '雨',
      condition: '強め',
      recommend: '屋内での運動がオススメです',
    },
    {
      icon: Wind,
      text: '風強め',
      condition: 'やや強め',
      recommend: '風が強いので屋内での運動がオススメです',
    },
  ];

  const randomIndex = Math.floor(Math.random() * weatherConditions.length);
  return weatherConditions[randomIndex];
};
