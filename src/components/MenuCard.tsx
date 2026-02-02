import { Edit, Trash2, GripVertical } from 'lucide-react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { TrainingMenu, DayOfWeek } from '../types';

interface MenuCardProps {
  menu: TrainingMenu;
  day?: DayOfWeek;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

/**
 * トレーニングメニューを表示するカードコンポーネント
 */
const MenuCard: React.FC<MenuCardProps> = ({ menu, day, onEdit, onDelete, showActions = true, dragHandleProps }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 24px',
        borderRadius: '16px',
        marginBottom: '12px',
        background: '#F2F7F3',
        border: '2px solid #E8F5ED',
        transition: 'all 0.3s ease',
      }}
    >
      {showActions && (
        <div
          {...dragHandleProps}
          style={{
            cursor: 'grab',
            padding: '8px',
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <GripVertical size={24} style={{ color: '#9DD6B3' }} />
        </div>
      )}

      {/* 画像 */}
      {menu.image && (
        <img
          src={menu.image}
          alt={menu.name}
          style={{
            width: '64px',
            height: '64px',
            objectFit: 'cover',
            borderRadius: '12px',
            border: '2px solid #E8F5ED',
          }}
        />
      )}

      {/* メニュー情報 */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: '18px',
            color: '#2D5F3F',
            marginBottom: '4px',
          }}
        >
          {menu.name}
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#6FBF8E' }}>
          {day && (
            <span
              style={{
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'white',
                fontWeight: 500,
              }}
            >
              {day}
            </span>
          )}
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'white',
              fontWeight: 500,
            }}
          >
            {menu.reps}
            {menu.unit}
          </span>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'white',
              fontWeight: 500,
            }}
          >
            {menu.sets}セット
          </span>
        </div>
      </div>

      {/* アクションボタン */}
      {showActions && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onEdit}
            style={{
              padding: '12px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'background 0.3s',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Edit size={24} style={{ color: '#6FBF8E' }} />
          </button>

          <button
            onClick={onDelete}
            style={{
              padding: '12px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'background 0.3s',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Trash2 size={24} style={{ color: '#E57373' }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
