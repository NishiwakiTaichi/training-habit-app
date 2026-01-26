import React from 'react';

/**
 * トップ画面用のイラスト
 */
export const TopScreenIllustration: React.FC = () => {
  return (
    <img
      src="/images/top-screen.png"
      alt="トップ画面イラスト"
      style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
    />
  );
};

/**
 * トレーニング画面用のイラスト
 */
export const TrainingScreenIllustration: React.FC = () => {
  return (
    <img
      src="/images/training-image.png"
      alt="トレーニング画面イラスト"
      style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
    />
  );
};

/**
 * 装飾用の葉っぱ（既存のSVG）
 */
export const DecorativeLeaves: React.FC = () => {
  return (
    <>
      <div className="leaf leaf-1"></div>
      <div className="leaf leaf-2"></div>
    </>
  );
};
