import { LucideIcon } from 'lucide-react';

/**
 * トレーニングメニューの型
 */
export interface TrainingMenu {
  name: string;
  emoji: string;
  reps: number;
  sets: number;
  unit: '秒' | '回' | '分';
  category?: string;
}

/**
 * 曜日の型
 */
export type DayOfWeek = '日' | '月' | '火' | '水' | '木' | '金' | '土';

/**
 * 曜日別のトレーニングメニュー
 */
export type WeeklyMenus = Record<DayOfWeek, TrainingMenu[]>;

/**
 * 天気情報の型
 */
export interface WeatherInfo {
  icon: LucideIcon;
  text: string;
  condition: string;
  recommend: string;
}

/**
 * 画面の種類
 */
export type ScreenType =
  | 'start'
  | 'training'
  | 'complete'
  | 'calendar'
  | 'menuManagement';

/**
 * ボタンのバリアント
 */
export type ButtonVariant = 'primary' | 'secondary';
