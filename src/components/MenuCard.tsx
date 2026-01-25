import React from 'react';
import { Edit, Trash2, GripVertical } from 'lucide-react';
import { TrainingMenu, DayOfWeek } from '../types';

interface MenuCardProps {
  menu: TrainingMenu;
  day?: DayOfWeek;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

/**
 * トレーニングメニューを表示するカードコンポーネント
 */
const MenuCard: React.FC<MenuCardProps> = ({
  menu,
  day,
  onEdit,
  onDelete,
  showActions = true
}) => {
  return (
    <div
      className="flex items-center gap-4 p-6 rounded-2xl mb-3 transition-all hover:shadow-md"
      style={{ background: '#F2F7F3', border: '2px solid #E8F5ED' }}
    >
      {showActions && (
        <button className="cursor-grab p-2 hover:bg-white rounded-lg transition-colors">
          <GripVertical size={24} style={{ color: '#9DD6B3' }} />
        </button>
      )}

      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
        style={{ background: '#E8F5ED' }}
      >
        {menu.emoji}
      </div>

      <div className="flex-1">
        <div className="font-bold text-xl mb-1" style={{ color: '#2D5F3F' }}>
          {menu.name}
        </div>
        <div className="flex gap-4 text-sm" style={{ color: '#6FBF8E' }}>
          {day && (
            <span className="px-3 py-1 rounded-full bg-white font-medium">
              {day}
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-white font-medium">
            {menu.reps}{menu.unit}
          </span>
          <span className="px-3 py-1 rounded-full bg-white font-medium">
            {menu.sets}セット
          </span>
        </div>
      </div>

      {showActions && (
        <>
          <button
            onClick={onEdit}
            className="p-3 hover:bg-white rounded-lg transition-colors"
          >
            <Edit size={24} style={{ color: '#6FBF8E' }} />
          </button>

          <button
            onClick={onDelete}
            className="p-3 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={24} style={{ color: '#E57373' }} />
          </button>
        </>
      )}
    </div>
  );
};

export default MenuCard;
