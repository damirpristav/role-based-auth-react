import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export const Button = ({ label, isLoading, variant, isSmall, isPaginationButton, ...props }: Props) => {
  return (
    <button
      className={clsx('button', {
        'button--outline': variant === 'outline',
        'button--outline-light': variant === 'outline-light',
        'button--danger': variant === 'danger',
        'button--small': isSmall,
        'button--paginate': isPaginationButton,
      })}
      {...props}
    >
      <span className={isLoading ? 'opacity-0' : ''}>{label || 'submit'}</span>
      {isLoading && (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}
    </button>
  );
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isLoading?: boolean;
  variant?: 'outline' | 'outline-light' | 'danger';
  isSmall?: boolean;
  isPaginationButton?: boolean;
}
