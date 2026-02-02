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
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        background: '#F2F7F3',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          background: '#FEFEFE',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          padding: '64px',
          textAlign: 'center',
        }}
      >
        {/* チェックマークアイコン */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '128px',
              height: '128px',
              borderRadius: '50%',
              background: '#6FBF8E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Check size={64} style={{ color: 'white' }} strokeWidth={4} />
          </div>
        </div>

        {/* メッセージ */}
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 900,
            color: '#6FBF8E',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Complete!!
        </h2>

        <p
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#2D5F3F',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          お疲れ様でした！
        </p>
        <p
          style={{
            fontSize: '18px',
            color: '#5DAD7C',
            marginBottom: '48px',
            textAlign: 'center',
          }}
        >
          今日のトレーニングメニューはこれで完了しました！
        </p>

        {/* ボタン */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Button
            variant="secondary"
            onClick={onBack}
            icon={<ChevronLeft size={16} />}
            style={{ padding: '10px 24px', fontSize: '14px' }}
          >
            戻る
          </Button>

          <Button
            variant="primary"
            onClick={onCalendar}
            icon={<Calendar size={16} />}
            style={{ padding: '10px 24px', fontSize: '14px' }}
          >
            カレンダー
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompleteScreen;
