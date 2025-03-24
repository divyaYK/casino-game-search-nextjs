'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.scss';

interface ICasinoButtonProps {
  variant: '1' | '2' | '3' | '4' | '5';
}

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & ICasinoButtonProps
>(({ children, ...props }, ref) => {
  const { variant, className, ...rest } = props;
  const variantClass = `btn-variant-${variant}`;
  const finalClassName = [styles.btn, styles[variantClass], className]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      ref={ref}
      type="button"
      {...rest}
      className={finalClassName}
      suppressHydrationWarning
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
