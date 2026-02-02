import { useState } from 'react';

/**
 * ローカルストレージと同期するカスタムフック
 * @param key ローカルストレージのキー
 * @param initialValue 初期値
 * @returns [値, 更新関数]
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 初期値を取得（ローカルストレージまたはデフォルト値）
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // カスタムセッター関数
  const setValue = (value: T) => {
    try {
      // 状態を更新
      setStoredValue(value);
      // localStorageに保存
      window.localStorage.setItem(key, JSON.stringify(value));
      if (import.meta.env.DEV) {
        console.log(`Saved to localStorage [${key}]:`, value);
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
