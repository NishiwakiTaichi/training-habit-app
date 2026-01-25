import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import { generateCalendarDays, isSameDay, isToday } from '../utils/dateUtils';
import { TrainingMenu } from '../types';

interface CalendarScreenProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  onEdit: () => void;
  onBack: () => void;
  completedDates: Set<string>;
  selectedDayMenus: TrainingMenu[];
}

/**
 * カレンダー画面
 */
const CalendarScreen: React.FC<CalendarScreenProps> = ({
  selectedDate,
  onDateSelect,
  onMonthChange,
  onEdit,
  onBack,
  completedDates,
  selectedDayMenus
}) => {
  const calendarDays = generateCalendarDays(selectedDate);

  const handlePreviousMonth = (): void => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = (): void => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  const isDateCompleted = (date: Date): boolean => {
    return Array.from(completedDates).some(completedDate =>
      isSameDay(new Date(completedDate), date)
    );
  };

  return (
    <div className="min-h-screen p-8" style={{ background: '#F2F7F3' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* カレンダー部分 */}
          <div
            className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 animate-fadeInUp"
            style={{ border: '3px solid #6FBF8E' }}
          >
            {/* 月の表示とナビゲーション */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handlePreviousMonth}
                className="p-3 rounded-full hover:bg-green-50 transition-colors"
                style={{ color: '#6FBF8E' }}
              >
                <ChevronLeft size={28} />
              </button>

              <h3 className="text-3xl font-black" style={{ color: '#2D5F3F' }}>
                {selectedDate.getFullYear()}年 {selectedDate.getMonth() + 1}月
              </h3>

              <button
                onClick={handleNextMonth}
                className="p-3 rounded-full hover:bg-green-50 transition-colors"
                style={{ color: '#6FBF8E' }}
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* カレンダーグリッド */}
            <div className="grid grid-cols-7 gap-3">
              {/* 曜日ヘッダー */}
              {['日', '月', '火', '水', '木', '金', '土'].map(day => (
                <div
                  key={day}
                  className="text-center font-bold text-lg py-3"
                  style={{ color: '#5DAD7C' }}
                >
                  {day}
                </div>
              ))}

              {/* 日付 */}
              {calendarDays.map((day, idx) => {
                if (!day) {
                  return <div key={`empty-${idx}`} className="aspect-square"></div>;
                }

                const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                const isCompleted = isDateCompleted(date);
                const isSelected = isSameDay(selectedDate, date);
                const isTodayDate = isToday(date);

                return (
                  <button
                    key={day}
                    onClick={() => onDateSelect(date)}
                    className={`aspect-square rounded-2xl font-bold text-lg transition-all ${isCompleted ? 'text-white shadow-lg' : 'hover:bg-green-50'
                      } ${isSelected ? 'ring-4' : ''} ${isTodayDate ? 'border-4' : ''}`}
                    style={{
                      background: isCompleted ? '#6FBF8E' : isSelected ? '#E8F5ED' : 'transparent',
                      outline: isSelected ? '4px solid #6FBF8E' : 'none',  // ← ringColorをoutlineに変更
                      borderColor: isTodayDate ? '#6FBF8E' : 'transparent',
                      color: isCompleted ? 'white' : '#2D5F3F'
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* 凡例 */}
            <div className="flex gap-6 mt-8 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg" style={{ background: '#6FBF8E' }}></div>
                <span className="font-medium" style={{ color: '#2D5F3F' }}>達成</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-lg border-3"
                  style={{ borderColor: '#E8F5ED', background: '#F9FCFA' }}
                ></div>
                <span className="font-medium" style={{ color: '#2D5F3F' }}>未達成</span>
              </div>
            </div>
          </div>

          {/* 選択した日のメニュー表示 */}
          <div
            className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeInUp"
            style={{ border: '3px solid #6FBF8E', animationDelay: '0.1s' }}
          >
            <h3
              className="text-2xl font-black mb-6"
              style={{ color: '#2D5F3F' }}
            >
              {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日のメニュー
            </h3>

            {/* メニューリスト */}
            <div className="space-y-4 mb-6">
              {selectedDayMenus.length > 0 ? (
                selectedDayMenus.map((menu, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl"
                    style={{ background: '#F2F7F3' }}
                  >
                    <div
                      className="font-bold text-lg mb-1"
                      style={{ color: '#2D5F3F' }}
                    >
                      {menu.name}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: '#6FBF8E' }}
                    >
                      {menu.reps}{menu.unit} × {menu.sets}セット
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  この日はメニューがありません
                </div>
              )}
            </div>

            {/* ボタン */}
            <Button
              variant="primary"
              onClick={onEdit}
              className="w-full mb-4"
            >
              編集
            </Button>

            <Button
              variant="secondary"
              onClick={onBack}
              icon={<ChevronLeft size={24} />}
              className="w-full"
            >
              戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarScreen;
