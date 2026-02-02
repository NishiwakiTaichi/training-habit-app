import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { TrainingMenu, DayOfWeek } from '../types';
import { menuTemplates } from '../data/trainingData';

interface MenuDetailScreenProps {
  menu?: TrainingMenu;
  selectedDay?: DayOfWeek;
  onSave: (menu: TrainingMenu, days: DayOfWeek[]) => void;
  onBack: () => void;
}

/**
 * メニュー詳細画面
 */
const MenuDetailScreen: React.FC<MenuDetailScreenProps> = ({ menu, selectedDay, onSave, onBack }) => {
  const [name, setName] = useState<string>('');
  const [reps, setReps] = useState<number | ''>('');
  const [sets, setSets] = useState<number | ''>('');
  const [unit, setUnit] = useState<'秒' | '回' | '分'>('回');
  const [days, setDays] = useState<DayOfWeek[]>(selectedDay ? [selectedDay] : ['月']);
  const [image, setImage] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const allDays: DayOfWeek[] = ['日', '月', '火', '水', '木', '金', '土'];

  // 編集モードの場合、既存データを読み込む
  useEffect(() => {
    if (menu) {
      setName(menu.name);
      setReps(menu.reps);
      setSets(menu.sets);
      setUnit(menu.unit);
      setImage(menu.image || '');
    }
    if (selectedDay) {
      setDays([selectedDay]);
    }
  }, [menu, selectedDay]);

  // テンプレート選択時の処理
  const handleTemplateSelect = (template: TrainingMenu) => {
    setName(template.name);
    setReps(template.reps);
    setSets(template.sets);
    setUnit(template.unit);
    setImage(template.image || '');
    setSelectedTemplate(template.name);
  };

  // 画像アップロード処理
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ドラッグオーバー時の処理
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // ドロップ時の処理
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];

      // 画像ファイルかチェック
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('画像ファイルを選択してください');
      }
    }
  };

  // 保存処理
  const handleSave = () => {
    if (!name.trim()) {
      alert('メニュー名を入力してください');
      return;
    }

    if (days.length === 0) {
      alert('曜日を選択してください');
      return;
    }

    const newMenu: TrainingMenu = {
      name: name.trim(),
      emoji: '💪',
      reps: reps || 0,
      sets: sets || 0,
      unit,
      image,
      category: 'カスタム',
    };

    // 選択された全ての曜日を配列として渡す
    onSave(newMenu, days);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '32px',
        background: '#F2F7F3',
        overflowY: 'auto',
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        <div
          style={{
            background: '#FEFEFE',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            padding: '48px',
          }}
        >
          {/* ヘッダー */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 900,
                color: '#2D5F3F',
                flex: 1,
                textAlign: 'center',
              }}
            >
              メニュー詳細
            </h2>
          </div>

          {/* タブ: 戻る/保存 */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
            <button
              onClick={onBack}
              style={{
                padding: '10px 24px',
                borderRadius: '14px',
                background: 'white',
                border: '2px solid #E8F5ED',
                color: '#6FBF8E',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              戻る
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '10px 24px',
                borderRadius: '14px',
                background: '#6FBF8E',
                border: '2px solid #6FBF8E',
                color: 'white',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              保存
            </button>
          </div>

          {/* メニュー名 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#2D5F3F', marginBottom: '8px' }}>
              メニュー名 <span style={{ color: '#E57373' }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ハムストリングスストレッチ"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #E8F5ED',
                borderRadius: '12px',
                fontSize: '16px',
              }}
            />
          </div>

          {/* 選択中の画像 */}
          {image && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 700, color: '#2D5F3F', marginBottom: '8px' }}>
                選択中の画像
              </label>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={image}
                  alt="選択中"
                  style={{
                    maxWidth: '300px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    border: '3px solid #E8F5ED',
                  }}
                />
                <button
                  onClick={() => setImage('')}
                  style={{
                    marginTop: '12px',
                    padding: '8px 16px',
                    background: '#E57373',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  画像をクリア
                </button>
              </div>
            </div>
          )}

          {/* テンプレートから選択 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#2D5F3F', marginBottom: '12px' }}>
              テンプレートから選択
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '12px',
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '12px',
                border: '2px solid #E8F5ED',
                borderRadius: '12px',
              }}
            >
              {menuTemplates.map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTemplateSelect(template)}
                  style={{
                    padding: '8px',
                    border: selectedTemplate === template.name ? '3px solid #6FBF8E' : '2px solid #E8F5ED',
                    borderRadius: '12px',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  {template.image && (
                    <img
                      src={template.image}
                      alt={template.name}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '4px',
                      }}
                    />
                  )}
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#2D5F3F' }}>{template.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* カスタム画像アップロード */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#2D5F3F', marginBottom: '8px' }}>
              カスタム画像をアップロード
            </label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                border: '2px dashed #E8F5ED',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                background: '#F9FCFA',
                transition: 'all 0.3s',
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: '#6FBF8E',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                <Upload size={20} />
                ファイルを選択
              </label>
              <p style={{ marginTop: '12px', fontSize: '14px', color: '#999' }}>または画像をここにドラッグ&ドロップ</p>
            </div>
          </div>

          {/* 曜日選択 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#2D5F3F', marginBottom: '8px' }}>
              曜日（複数選択可） <span style={{ color: '#E57373' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {allDays.map((d) => {
                const isSelected = days.includes(d as DayOfWeek);
                return (
                  <button
                    key={d}
                    onClick={() => {
                      if (isSelected) {
                        setDays(days.filter((day) => day !== d));
                      } else {
                        setDays([...days, d as DayOfWeek]);
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '12px',
                      background: isSelected ? '#6FBF8E' : 'white',
                      border: `2px solid ${isSelected ? '#6FBF8E' : '#E8F5ED'}`,
                      color: isSelected ? 'white' : '#6FBF8E',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 回数・セット数・単位 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#2D5F3F', marginBottom: '8px' }}>回数</label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="10"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E8F5ED',
                  borderRadius: '12px',
                  fontSize: '16px',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#2D5F3F', marginBottom: '8px' }}>単位</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as '秒' | '回' | '分')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E8F5ED',
                  borderRadius: '12px',
                  fontSize: '16px',
                }}
              >
                <option value="回">回</option>
                <option value="秒">秒</option>
                <option value="分">分</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#2D5F3F', marginBottom: '8px' }}>
                セット数
              </label>
              <input
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="3"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E8F5ED',
                  borderRadius: '12px',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>

          {/* メモ */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#2D5F3F', marginBottom: '8px' }}>メモ</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="このエクササイズに関するメモ..."
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #E8F5ED',
                borderRadius: '12px',
                fontSize: '16px',
                resize: 'vertical',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailScreen;
