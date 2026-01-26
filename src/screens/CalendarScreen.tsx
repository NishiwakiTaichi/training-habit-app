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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        background: '#F2F7F3'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1400px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          {/* カレンダー部分 */}
          <div
            style={{
              background: '#FEFEFE',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              padding: '48px'
            }}
          >
            {/* 月の表示とナビゲーション */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <button
                onClick={handlePreviousMonth}
                style={{
                  padding: '12px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: 'none',
                  color: '#6FBF8E',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <ChevronLeft size={28} />
              </button>

              <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#2D5F3F' }}>
                {selectedDate.getFullYear()}年 {selectedDate.getMonth() + 1}月
              </h3>

              <button
                onClick={handleNextMonth}
                style={{
                  padding: '12px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: 'none',
                  color: '#6FBF8E',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* カレンダーグリッド */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
              {/* 曜日ヘッダー */}
              {['日', '月', '火', '水', '木', '金', '土'].map(day => (
                <div
                  key={day}
                  style={{
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '16px',
                    padding: '12px',
                    color: '#5DAD7C'
                  }}
                >
                  {day}
                </div>
              ))}

              {/* 日付 */}
              {calendarDays.map((day, idx) => {
                if (!day) {
                  return <div key={`empty-${idx}`} style={{ aspectRatio: '1' }}></div>;
                }

                const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                const isCompleted = isDateCompleted(date);
                const isSelected = isSameDay(selectedDate, date);
                const isTodayDate = isToday(date);

                return (
                  <button
                    key={day}
                    onClick={() => onDateSelect(date)}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '16px',
                      fontWeight: 700,
                      fontSize: '18px',
                      background: isCompleted ? '#6FBF8E' : isSelected ? '#E8F5ED' : 'transparent',
                      outline: isSelected ? '4px solid #6FBF8E' : 'none',
                      border: isTodayDate ? '4px solid #6FBF8E' : 'none',
                      color: isCompleted ? 'white' : '#2D5F3F',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* 凡例 */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '32px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '8px', background: '#6FBF8E' }}></div>
                <span style={{ fontWeight: 500, color: '#2D5F3F' }}>達成</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '8px',
                    border: '3px solid #E8F5ED',
                    background: '#F9FCFA'
                  }}
                ></div>
                <span style={{ fontWeight: 500, color: '#2D5F3F' }}>未達成</span>
              </div>
            </div>
          </div>

          {/* 選択した日のメニュー表示 */}
          <div
            style={{
              background: '#FEFEFE',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              padding: '48px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 900,
                color: '#2D5F3F',
                marginBottom: '24px'
              }}
            >
              {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日のメニュー
            </h3>

            {/* メニューリスト */}
            <div style={{ flex: 1, marginBottom: '24px' }}>
              {selectedDayMenus.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {selectedDayMenus.map((menu, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px',
                        borderRadius: '16px',
                        background: '#F2F7F3'
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: '18px',
                          color: '#2D5F3F',
                          marginBottom: '4px'
                        }}
                      >
                        {menu.name}
                      </div>
                      <div
                        style={{
                          fontSize: '14px',
                          color: '#6FBF8E'
                        }}
                      >
                        {menu.reps}{menu.unit} × {menu.sets}セット
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px', color: '#999' }}>
                  この日はメニューがありません
                </div>
              )}
            </div>

            {/* ボタン */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button
                variant="primary"
                onClick={onEdit}
                style={{ width: '100%', padding: '12px 24px', fontSize: '16px' }}
              >
                編集
              </Button>

              <Button
                variant="secondary"
                onClick={onBack}
                icon={<ChevronLeft size={18} />}
                style={{ width: '100%', padding: '12px 24px', fontSize: '16px' }}
              >
                戻る
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarScreen;
