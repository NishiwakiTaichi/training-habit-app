import React from 'react';
import { Check, ChevronLeft, Calendar } from 'lucide-react';
import Button from '../components/Button';

interface CompleteScreenProps {
  onBack: () => void;
  onCalendar: () => void;
}

/**
 * 完了画面
 */
const CompleteScreen: React.FC<CompleteScreenProps> = ({ onBack, onCalendar }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ background: '#F2F7F3' }}
    >
      <div
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-16 text-center animate-scaleIn"
        style={{ border: '3px solid #6FBF8E' }}
      >
        {/* チェックマークアイコン */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center animate-pulse">
            <Check size={64} style={{ color: '#6FBF8E' }} strokeWidth={3} />
          </div>
        </div>

        {/* メッセージ */}
        <h2
          className="text-5xl font-black mb-6"
          style={{ color: '#6FBF8E' }}
        >
          Complete!!
        </h2>

        <p
          className="text-2xl font-bold mb-4"
          style={{ color: '#2D5F3F' }}
        >
          お疲れ様でした！
        </p>
        <p
          className="text-xl mb-12"
          style={{ color: '#5DAD7C' }}
        >
          今日のトレーニングメニューはこれで完了しました！
        </p>

        {/* ボタン */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="secondary"
            onClick={onBack}
            icon={<ChevronLeft size={24} />}
            className="px-8 py-4 text-lg"
          >
            戻る
          </Button>

          <Button
            variant="primary"
            onClick={onCalendar}
            icon={<Calendar size={24} />}
            className="px-8 py-4 text-lg"
          >
            カレンダー
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompleteScreen;
