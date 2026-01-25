import React from 'react';
import { Plus, ChevronLeft } from 'lucide-react';
import Button from '../components/Button';
import MenuCard from '../components/MenuCard';
import { WeeklyMenus, DayOfWeek } from '../types';

interface MenuManagementScreenProps {
  trainingMenus: WeeklyMenus;
  onAdd: () => void;
  onEdit: (day: DayOfWeek, index: number) => void;
  onDelete: (day: DayOfWeek, index: number) => void;
  onBack: () => void;
}

/**
 * メニュー管理画面
 */
const MenuManagementScreen: React.FC<MenuManagementScreenProps> = ({
  trainingMenus,
  onAdd,
  onEdit,
  onDelete,
  onBack
}) => {
  return (
    <div className="min-h-screen p-8" style={{ background: '#F2F7F3' }}>
      <div className="max-w-4xl mx-auto">
        <div
          className="bg-white rounded-3xl shadow-2xl p-12 animate-scaleIn"
          style={{ border: '3px solid #6FBF8E' }}
        >
          <h2
            className="text-4xl font-black mb-8 text-center"
            style={{ color: '#2D5F3F' }}
          >
            メニュー管理
          </h2>

          {/* 追加ボタン */}
          <Button
            variant="primary"
            onClick={onAdd}
            icon={<Plus size={24} />}
            className="w-full mb-8"
          >
            トレーニングメニューを追加
          </Button>

          {/* メニューリスト */}
          <div className="space-y-4 mb-8">
            {(Object.entries(trainingMenus) as [DayOfWeek, typeof trainingMenus[DayOfWeek]][]).map(([day, menus]) => (
              <div key={day}>
                {menus.map((menu, idx) => (
                  <MenuCard
                    key={`${day}-${idx}`}
                    menu={menu}
                    day={day}
                    onEdit={() => onEdit(day, idx)}
                    onDelete={() => onDelete(day, idx)}
                    showActions={true}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* 戻るボタン */}
          <Button
            variant="secondary"
            onClick={onBack}
            icon={<ChevronLeft size={24} />}
            className="mx-auto"
          >
            戻る
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuManagementScreen;
