import React, { useState } from 'react';
import { Plus, ChevronLeft } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Button from '../components/Button';
import MenuCard from '../components/MenuCard';
import { WeeklyMenus, DayOfWeek } from '../types';

interface MenuManagementScreenProps {
  trainingMenus: WeeklyMenus;
  onAdd: () => void;
  onEdit: (day: DayOfWeek, index: number) => void;
  onDelete: (day: DayOfWeek, index: number) => void;
  onCopy: (sourceDay: DayOfWeek, targetDays: DayOfWeek[]) => void;
  onReorder: (day: DayOfWeek, sourceIndex: number, destinationIndex: number) => void;
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
  onCopy,
  onReorder,
  onBack,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('月');
  const days: DayOfWeek[] = ['日', '月', '火', '水', '木', '金', '土'];
  const [showCopyDialog, setShowCopyDialog] = useState<boolean>(false);
  const [copyTargetDays, setCopyTargetDays] = useState<DayOfWeek[]>([]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.source.index === result.destination.index) {
      return;
    }

    onReorder(selectedDay, result.source.index, result.destination.index);
  };

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
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <div
          style={{
            background: '#FEFEFE',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            padding: '48px',
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 900,
              color: '#2D5F3F',
              marginBottom: '32px',
              textAlign: 'center',
            }}
          >
            メニュー管理
          </h2>

          {/* 曜日選択ボタン */}
          <div
            style={{ display: 'flex', gap: '12px', marginBottom: '32px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  background: selectedDay === day ? '#6FBF8E' : 'white',
                  border: `2px solid ${selectedDay === day ? '#6FBF8E' : '#E8F5ED'}`,
                  borderRadius: '14px',
                  color: selectedDay === day ? 'white' : '#6FBF8E',
                  cursor: 'pointer',
                  padding: '10px 24px',
                  fontSize: '16px',
                  fontWeight: 700,
                  transition: 'all 0.3s ease',
                }}
              >
                {day}
              </button>
            ))}
          </div>

          {/* 追加ボタン */}
          <Button
            variant="primary"
            onClick={onAdd}
            icon={<Plus size={24} />}
            style={{
              width: '100%',
              marginBottom: '16px',
              padding: '16px 32px',
              fontSize: '18px',
            }}
          >
            トレーニングメニューを追加
          </Button>

          {/* 複製ボタン */}
          {trainingMenus[selectedDay].length > 0 && (
            <Button
              variant="secondary"
              onClick={() => setShowCopyDialog(true)}
              style={{
                width: '100%',
                marginBottom: '32px',
                padding: '16px 32px',
                fontSize: '18px',
              }}
            >
              メニューセットを他の曜日に複製
            </Button>
          )}

          {/* 複製ダイアログ */}
          {showCopyDialog && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
              }}
              onClick={() => setShowCopyDialog(false)}
            >
              <div
                style={{
                  background: '#FEFEFE',
                  borderRadius: '24px',
                  padding: '48px',
                  maxWidth: '500px',
                  width: '90%',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 900,
                    color: '#2D5F3F',
                    marginBottom: '24px',
                    textAlign: 'center',
                  }}
                >
                  複製先の曜日を選択
                </h3>

                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '32px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {days
                    .filter((d) => d !== selectedDay)
                    .map((d) => {
                      const isSelected = copyTargetDays.includes(d);
                      return (
                        <button
                          key={d}
                          onClick={() => {
                            if (isSelected) {
                              setCopyTargetDays(copyTargetDays.filter((day) => day !== d));
                            } else {
                              setCopyTargetDays([...copyTargetDays, d]);
                            }
                          }}
                          style={{
                            padding: '10px 24px',
                            borderRadius: '14px',
                            background: isSelected ? '#6FBF8E' : 'white',
                            border: `2px solid ${isSelected ? '#6FBF8E' : '#E8F5ED'}`,
                            color: isSelected ? 'white' : '#6FBF8E',
                            fontSize: '16px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {d}
                        </button>
                      );
                    })}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowCopyDialog(false);
                      setCopyTargetDays([]);
                    }}
                    style={{ flex: 1, padding: '12px 24px', fontSize: '16px' }}
                  >
                    キャンセル
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (copyTargetDays.length === 0) {
                        alert('複製先の曜日を選択してください');
                        return;
                      }

                      onCopy(selectedDay, copyTargetDays);

                      setShowCopyDialog(false);
                      setCopyTargetDays([]);
                    }}
                    style={{ flex: 1, padding: '12px 24px', fontSize: '16px' }}
                  >
                    複製
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 選択された曜日のメニューリスト（D&D対応） */}
          <div style={{ marginBottom: '32px', minHeight: '200px' }}>
            {trainingMenus[selectedDay].length > 0 ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="menu-list">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {trainingMenus[selectedDay].map((menu, idx) => (
                        <Draggable
                          key={`${selectedDay}-${menu.name}-${idx}`}
                          draggableId={`${selectedDay}-${menu.name}-${idx}`}
                          index={idx}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.8 : 1,
                              }}
                            >
                              <MenuCard
                                menu={menu}
                                onEdit={() => onEdit(selectedDay, idx)}
                                onDelete={() => onDelete(selectedDay, idx)}
                                showActions={true}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '48px',
                  color: '#999',
                  fontSize: '16px',
                }}
              >
                {selectedDay}曜日のメニューはまだありません
              </div>
            )}
          </div>

          {/* 戻るボタン */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="secondary"
              onClick={onBack}
              icon={<ChevronLeft size={20} />}
              style={{ padding: '12px 32px', fontSize: '16px' }}
            >
              戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagementScreen;
