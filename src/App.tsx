import { useState, useEffect } from 'react';
import './styles/animations.css';
import StartScreen from './screens/StartScreen';
import TrainingScreen from './screens/TrainingScreen';
import CompleteScreen from './screens/CompleteScreen';
import CalendarScreen from './screens/CalendarScreen';
import MenuManagementScreen from './screens/MenuManagementScreen';
import { getDayOfWeek } from './utils/dateUtils';
import { getRandomWeather } from './utils/weatherUtils';
import { initialTrainingMenus } from './data/trainingData';
import { ScreenType, WeeklyMenus, WeatherInfo, DayOfWeek } from './types';

/**
 * メインアプリケーションコンポーネント
 */
function App(): JSX.Element {
  // 画面管理
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('start');

  // トレーニング関連の状態
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [trainingMenus, setTrainingMenus] = useState<WeeklyMenus>(initialTrainingMenus);
  const [completedDates, setCompletedDates] = useState<Set<string>>(new Set());

  // カレンダー関連の状態
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 天気情報
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  // 初期化：天気情報を取得
  useEffect(() => {
    setWeather(getRandomWeather());
  }, []);

  /**
   * 今日のメニューを取得
   */
  const getTodayMenus = () => {
    const today = getDayOfWeek(new Date());
    return trainingMenus[today] || [];
  };

  /**
   * 指定日のメニューを取得
   */
  const getMenuForDate = (date: Date) => {
    const dayOfWeek = getDayOfWeek(date);
    return trainingMenus[dayOfWeek] || [];
  };

  // ===== イベントハンドラー =====

  /**
   * トレーニング開始
   */
  const handleStart = (): void => {
    setCurrentExerciseIndex(0);
    setCurrentScreen('training');
  };

  /**
   * Clearボタン押下時
   */
  const handleClear = (): void => {
    const menus = getTodayMenus();
    if (currentExerciseIndex < menus.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // 全メニュー完了
      const today = new Date().toDateString();
      setCompletedDates(prev => new Set([...prev, today]));
      setCurrentScreen('complete');
    }
  };

  /**
   * 戻るボタン押下時
   */
  const handleBack = (): void => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    } else {
      setCurrentScreen('start');
    }
  };

  /**
   * メニュー選択時
   */
  const handleMenuSelect = (index: number): void => {
    setCurrentExerciseIndex(index);
  };

  /**
   * カレンダー画面へ遷移
   */
  const handleGoToCalendar = (): void => {
    setCurrentScreen('calendar');
  };

  /**
   * 日付選択時
   */
  const handleDateSelect = (date: Date): void => {
    setSelectedDate(date);
  };

  /**
   * 月変更時
   */
  const handleMonthChange = (date: Date): void => {
    setSelectedDate(date);
  };

  /**
   * メニュー管理画面へ遷移
   */
  const handleGoToMenuManagement = (): void => {
    setCurrentScreen('menuManagement');
  };

  /**
   * メニュー追加（仮実装）
   */
  const handleAddMenu = (): void => {
    alert('メニュー追加機能は開発中です');
  };

  /**
   * メニュー編集（仮実装）
   */
  const handleEditMenu = (day: DayOfWeek, index: number): void => {
    alert(`${day}曜日の${index + 1}番目のメニューを編集`);
  };

  /**
   * メニュー削除
   */
  const handleDeleteMenu = (day: DayOfWeek, index: number): void => {
    if (window.confirm('このメニューを削除しますか？')) {
      setTrainingMenus(prev => ({
        ...prev,
        [day]: prev[day].filter((_, idx) => idx !== index)
      }));
    }
  };

  /**
   * 地域変更時（天気情報更新）
   */
  const handleLocationChange = (location: string): void => {
    console.log('Location changed to:', location);
    // TODO: 実際のAPIで天気情報を取得
    setWeather(getRandomWeather());
  };

  // ===== 画面レンダリング =====

  if (!weather) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F2F7F3' }}>
        <div className="text-2xl font-bold" style={{ color: '#6FBF8E' }}>
          読み込み中...
        </div>
      </div>
    );
  }

  if (currentScreen === 'start') {
    return (
      <StartScreen
        weather={weather}
        onStart={handleStart}
        onLocationChange={handleLocationChange}
      />
    );
  }

  if (currentScreen === 'training') {
    return (
      <TrainingScreen
        menus={getTodayMenus()}
        currentIndex={currentExerciseIndex}
        onClear={handleClear}
        onBack={handleBack}
        onCalendar={handleGoToCalendar}
        onMenuSelect={handleMenuSelect}
      />
    );
  }

  if (currentScreen === 'complete') {
    return (
      <CompleteScreen
        onBack={() => setCurrentScreen('start')}
        onCalendar={handleGoToCalendar}
      />
    );
  }

  if (currentScreen === 'calendar') {
    return (
      <CalendarScreen
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        onMonthChange={handleMonthChange}
        onEdit={handleGoToMenuManagement}
        onBack={() => {
          setCurrentScreen('start');
          setCurrentExerciseIndex(0);
        }}
        completedDates={completedDates}
        selectedDayMenus={getMenuForDate(selectedDate)}
      />
    );
  }

  if (currentScreen === 'menuManagement') {
    return (
      <MenuManagementScreen
        trainingMenus={trainingMenus}
        onAdd={handleAddMenu}
        onEdit={handleEditMenu}
        onDelete={handleDeleteMenu}
        onBack={() => setCurrentScreen('calendar')}
      />
    );
  }

  return <div>画面が見つかりません</div>;
}

export default App;
