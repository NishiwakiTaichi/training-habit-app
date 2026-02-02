import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { ButtonVariant } from '../types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  icon?: ReactNode;
}

/**
 * 汎用ボタンコンポーネント
 */
const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, icon, className = '', style, ...props }) => {
  const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button
      className={`${baseClasses} ${className}`}
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: icon ? '8px' : '0',
      }}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>{icon}</span>}
      <span style={{ lineHeight: 1 }}>{children}</span>
    </button>
  );
};

export default Button;
