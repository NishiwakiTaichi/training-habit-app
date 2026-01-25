import React from 'react';

/**
 * ストレッチしている人のイラスト
 */
export const StretchingIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-md">
      {/* 影 */}
      <ellipse cx="200" cy="350" rx="120" ry="20" fill="#D5E8DC" opacity="0.5" />

      {/* 体 */}
      <ellipse cx="200" cy="180" rx="60" ry="80" fill="#FFD166" />

      {/* 頭 */}
      <circle cx="200" cy="100" r="40" fill="#FFA94D" />

      {/* 髪 */}
      <path d="M 170 80 Q 160 60 180 50 Q 200 40 220 50 Q 240 60 230 80 Z" fill="#2D2D2D" />

      {/* 目 */}
      <circle cx="190" cy="100" r="3" fill="#2D2D2D" />
      <circle cx="210" cy="100" r="3" fill="#2D2D2D" />

      {/* 笑顔 */}
      <path d="M 185 110 Q 200 115 215 110" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 左腕（上げている） */}
      <path d="M 150 160 Q 120 100 140 80" stroke="#FFA94D" strokeWidth="20" fill="none" strokeLinecap="round" />
      <circle cx="140" cy="80" r="12" fill="#FFA94D" />

      {/* 右腕（上げている） */}
      <path d="M 250 160 Q 280 100 260 80" stroke="#FFA94D" strokeWidth="20" fill="none" strokeLinecap="round" />
      <circle cx="260" cy="80" r="12" fill="#FFA94D" />

      {/* 脚 */}
      <ellipse cx="180" cy="290" rx="25" ry="70" fill="#4A5568" />
      <ellipse cx="220" cy="290" rx="25" ry="70" fill="#4A5568" />

      {/* 観葉植物 */}
      <ellipse cx="320" cy="350" rx="40" ry="15" fill="#D4A574" />
      <path d="M 300 330 Q 295 310 310 300" stroke="#6FBF8E" strokeWidth="6" fill="none" />
      <ellipse cx="310" cy="295" rx="15" ry="20" fill="#6FBF8E" />
      <path d="M 320 330 Q 325 305 335 295" stroke="#5DAD7C" strokeWidth="6" fill="none" />
      <ellipse cx="335" cy="290" rx="12" ry="18" fill="#5DAD7C" />
      <path d="M 340 330 Q 350 310 350 295" stroke="#7DD3A0" strokeWidth="6" fill="none" />
      <ellipse cx="350" cy="290" rx="14" ry="16" fill="#7DD3A0" />
    </svg>
  );
};

/**
 * 腕立て伏せしている人のイラスト
 */
export const PlankIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 400 300" className="w-full max-w-md">
      {/* 影 */}
      <ellipse cx="200" cy="280" rx="140" ry="20" fill="#D5E8DC" opacity="0.5" />

      {/* 体 */}
      <ellipse cx="200" cy="150" rx="80" ry="40" fill="#4A5568" transform="rotate(0 200 150)" />

      {/* 頭 */}
      <circle cx="140" cy="130" r="35" fill="#FFA94D" />

      {/* 髪 */}
      <path d="M 120 110 Q 110 95 125 90 Q 140 85 155 90 Q 165 95 160 110 Z" fill="#2D2D2D" />

      {/* 目 */}
      <circle cx="135" cy="130" r="3" fill="#2D2D2D" />
      <circle cx="150" cy="130" r="3" fill="#2D2D2D" />

      {/* 左腕 */}
      <rect x="120" y="160" width="18" height="80" rx="9" fill="#FFA94D" />
      <circle cx="129" cy="240" r="12" fill="#FFA94D" />

      {/* 右腕 */}
      <rect x="242" y="160" width="18" height="80" rx="9" fill="#FFA94D" />
      <circle cx="251" cy="240" r="12" fill="#FFA94D" />

      {/* 脚 */}
      <rect x="240" y="155" width="20" height="90" rx="10" fill="#2D2D2D" />
      <rect x="265" y="155" width="20" height="90" rx="10" fill="#2D2D2D" />
    </svg>
  );
};

/**
 * 装飾用の葉っぱ
 */
export const DecorativeLeaves: React.FC = () => {
  return (
    <>
      <div className="leaf leaf-1"></div>
      <div className="leaf leaf-2"></div>
    </>
  );
};
