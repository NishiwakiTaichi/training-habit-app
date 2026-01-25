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
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const iconClasses = icon ? 'flex items-center gap-2 justify-center' : '';

  return (
    <button
      className={`${baseClasses} ${iconClasses} ${className}`}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
