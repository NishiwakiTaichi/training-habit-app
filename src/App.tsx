import { useState, useEffect } from 'react';
import './styles/animations.css';
import StartScreen from './screens/StartScreen';
import TrainingScreen from './screens/TrainingScreen';
import CompleteScreen from './screens/CompleteScreen';
import CalendarScreen from './screens/CalendarScreen';
import { useLocalStorage } from './hooks/useLocalStorage';
import MenuManagementScreen from './screens/MenuManagementScreen';
import MenuDetailScreen from './screens/MenuDetailScreen';
import { getDayOfWeek } from './utils/dateUtils';
import { fetchWeather, fetchWeatherByCoords, getRandomWeather } from './utils/weatherUtils';
import { initialTrainingMenus } from './data/trainingData';
import { ScreenType, WeeklyMenus, WeatherInfo, DayOfWeek, TrainingMenu } from './types';

/**
 * メインアプリケーションコンポーネント
 */
function App(): JSX.Element {
  // 画面管理
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('start');
  const [showMenuDetail, setShowMenuDetail] = useState<boolean>(false);

  // トレーニング関連の状態
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [trainingMenus, setTrainingMenus] = useState<WeeklyMenus>(initialTrainingMenus);
  const [completedDates, setCompletedDates] = useState<Set<string>>(new Set());

  // カレンダー関連の状態
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // メニュー編集関連の状態
  const [editingMenu, setEditingMenu] = useState<TrainingMenu | undefined>(undefined);
  const [editingDay, setEditingDay] = useState<DayOfWeek | undefined>(undefined);
  const [editingIndex, setEditingIndex] = useState<number | undefined>(undefined);

  // 天気情報
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  const [savedLocation] = useLocalStorage('training-app-location', '東京');

  // 初期化：天気情報を取得
  useEffect(() => {
    const initWeather = async () => {
      let weatherData = null;

      // 保存された地域の天気を取得
      if (savedLocation.includes(',')) {
        // 緯度経度の場合
        const [lat, lon] = savedLocation.split(',').map(Number);
        weatherData = await fetchWeatherByCoords(lat, lon);
      } else {
        // 地域名の場合
        weatherData = await fetchWeather(savedLocation);
      }

      // API失敗時はランダム天気をフォールバック
      setWeather(weatherData || getRandomWeather());
    };

    initWeather();
  }, [savedLocation]);

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
   * メニュー追加
   */
  const handleAddMenu = (): void => {
    setEditingMenu(undefined);
    setEditingDay(getDayOfWeek(new Date()));
    setEditingIndex(undefined);
    setShowMenuDetail(true);
  };

  /**
   * メニュー編集
   */
  const handleEditMenu = (day: DayOfWeek, index: number): void => {
    setEditingMenu(trainingMenus[day][index]);
    setEditingDay(day);
    setEditingIndex(index);
    setShowMenuDetail(true);
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
   * メニュー複製
   */
  const handleCopyMenus = (sourceDay: DayOfWeek, targetDays: DayOfWeek[]): void => {
    const sourceMenus = trainingMenus[sourceDay];
    setTrainingMenus(prev => {
      const newMenus = { ...prev };
      targetDays.forEach(targetDay => {
        newMenus[targetDay] = [...newMenus[targetDay], ...sourceMenus];
      });
      return newMenus;
    });
  };

  /**
   * メニューの並び替え
   */
  const handleReorderMenus = (day: DayOfWeek, sourceIndex: number, destinationIndex: number): void => {
    setTrainingMenus(prev => {
      const dayMenus = [...prev[day]];
      const [removed] = dayMenus.splice(sourceIndex, 1);
      dayMenus.splice(destinationIndex, 0, removed);

      return {
        ...prev,
        [day]: dayMenus
      };
    });
  };

  /**
   * メニュー保存
   */
  const handleSaveMenu = (menu: TrainingMenu, selectedDays: DayOfWeek[]): void => {
    if (editingIndex !== undefined && editingDay) {
      // 編集モード：元の曜日から削除して、新しい曜日に追加
      setTrainingMenus(prev => {
        const newMenus = { ...prev };

        // 元の曜日から削除
        newMenus[editingDay] = newMenus[editingDay].filter((_, idx) => idx !== editingIndex);

        // 選択された全ての曜日に追加
        selectedDays.forEach(day => {
          newMenus[day] = [...newMenus[day], menu];
        });

        return newMenus;
      });
    } else {
      // 新規追加モード：選択された全ての曜日に追加
      setTrainingMenus(prev => {
        const newMenus = { ...prev };
        selectedDays.forEach(day => {
          newMenus[day] = [...newMenus[day], menu];
        });
        return newMenus;
      });
    }

    setShowMenuDetail(false);
    setEditingMenu(undefined);
    setEditingDay(undefined);
    setEditingIndex(undefined);
  };

  /**
   * メニュー詳細画面から戻る
   */
  const handleBackFromMenuDetail = (): void => {
    setShowMenuDetail(false);
    setEditingMenu(undefined);
    setEditingDay(undefined);
    setEditingIndex(undefined);
  };

  /**
   * 地域変更時（天気情報更新）
   */
  const handleLocationChange = async (location: string): Promise<void> => {
    console.log('Location changed to:', location);

    let weatherData = null;

    if (location.includes(',')) {
      // 緯度経度の場合
      const [lat, lon] = location.split(',').map(Number);
      weatherData = await fetchWeatherByCoords(lat, lon);
    } else {
      // 地域名の場合
      weatherData = await fetchWeather(location);
    }

    // API失敗時はランダム天気をフォールバック
    setWeather(weatherData || getRandomWeather());
  };

  // ===== 画面レンダリング =====

  if (!weather) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F2F7F3'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: '#6FBF8E' }}>
          読み込み中...
        </div>
      </div>
    );
  }

  // メニュー詳細画面
  if (showMenuDetail) {
    return (
      <MenuDetailScreen
        menu={editingMenu}
        selectedDay={editingDay}
        onSave={handleSaveMenu}
        onBack={handleBackFromMenuDetail}
      />
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
        onCopy={handleCopyMenus}
        onReorder={handleReorderMenus}
        onBack={() => setCurrentScreen('calendar')}
      />
    );
  }

  return <div>画面が見つかりません</div>;
}

export default App;
