import { DayOfWeek } from '../types';

/**
 * 日付から曜日を取得する
 * @param date - 日付オブジェクト
 * @returns 曜日（日、月、火、水、木、金、土）
 */
export const getDayOfWeek = (date: Date): DayOfWeek => {
  const days: DayOfWeek[] = ['日', '月', '火', '水', '木', '金', '土'];
  return days[date.getDay()];
};

/**
 * カレンダー表示用の日付配列を生成する
 * @param date - 基準となる日付
 * @returns 日付の配列（null は空白セル）
 */
export const generateCalendarDays = (date: Date): (number | null)[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const days: (number | null)[] = [];

  // 月初までの空白を追加
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  // 日付を追加
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
};

/**
 * 2つの日付が同じ日かどうかを判定する
 * @param date1 - 日付1
 * @param date2 - 日付2
 * @returns 同じ日の場合true
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

/**
 * 今日の日付かどうかを判定する
 * @param date - チェックする日付
 * @returns 今日の場合true
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * 日付文字列をフォーマットする
 * @param date - 日付オブジェクト
 * @returns フォーマットされた日付文字列（例：2026年1月25日）
 */
export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
